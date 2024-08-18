package com.youniform.api.domain.user.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youniform.api.domain.chat.entity.ChatPart;
import com.youniform.api.domain.chat.entity.ChatPartPK;
import com.youniform.api.domain.chat.entity.ChatRoom;
import com.youniform.api.domain.chat.repository.ChatPartRepository;
import com.youniform.api.domain.chat.repository.ChatRoomRepository;
import com.youniform.api.domain.friend.service.FriendService;
import com.youniform.api.domain.photocard.entity.Photocard;
import com.youniform.api.domain.photocard.repository.PhotocardRepository;
import com.youniform.api.domain.player.entity.Player;
import com.youniform.api.domain.player.repository.PlayerRepository;
import com.youniform.api.domain.team.entity.Team;
import com.youniform.api.domain.team.repository.TeamRepository;
import com.youniform.api.domain.user.dto.*;
import com.youniform.api.domain.user.entity.Theme;
import com.youniform.api.domain.user.entity.UserPlayer;
import com.youniform.api.domain.user.entity.UserPlayerPK;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserPlayerRepository;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.dto.SliceDto;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.entity.JwtRedis;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.mail.service.MailService;
import com.youniform.api.global.redis.RedisUtils;
import com.youniform.api.global.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.youniform.api.domain.user.entity.QUsers.users;
import static com.youniform.api.global.statuscode.ErrorCode.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    private final RedisUtils redisUtils;

    private final JwtService jwtService;

    private final JPAQueryFactory queryFactory;

    private final PasswordEncoder passwordEncoder;

    private final FriendService friendService;

    private final S3Service s3Service;

    private final MailService mailService;

    private final PlayerRepository playerRepository;

    private final TeamRepository teamRepository;

    private final UserPlayerRepository userPlayerRepository;

    private final ChatRoomRepository chatRoomRepository;

    private final ChatPartRepository chatPartRepository;

    private final PhotocardRepository photocardRepository;

    @Value("${CLOUD_FRONT}")
    private String cloudFrontUrl;

    @Transactional
    @Override
    public void resignUser(Long userId) {
        queryFactory.update(users)
                .set(users.isDeleted, true)
                .where(users.id.eq(userId))
                .execute();
    }

    @Override
    public String signin(LocalSigninReq user) {
        Users users = userRepository.findByEmail(user.getEmail());

        if (users != null && passwordEncoder.matches(user.getPassword(), users.getPassword())) {
            redisUtils.setData(users.getUuid(), JwtRedis.builder()
                    .userId(users.getId())
                    .uuid(users.getUuid())
                    .refreshToken(jwtService.createRefreshToken(users.getUuid()))
                    .build()
            );

            return jwtService.createAccessToken(users.getUuid());
        }

        throw new CustomException(USER_NOT_FOUND);
    }

    @Override
    @Transactional
    public String signup(SignupReq user) {
        String uuid = UUID.randomUUID().toString();

        if (userRepository.findByEmail(user.getEmail()) != null){
            throw new CustomException(ALREADY_EXIST_USER);
        }

        if (userRepository.findByNickname(user.getNickname()) != null) {
            throw new CustomException(ALREADY_EXIST_USER);
        }

        if (user.getProviderType().equals("local")) {
            String verifyCode = user.getVerifyCode();
            String verify = (String) redisUtils.getData(user.getEmail()+"_verify");
            if(verify == null || !verify.equals(verifyCode)) {
                throw new CustomException(BAD_SIGNUP_REQUEST);
            }

            String password = passwordEncoder.encode(user.getPassword());
            user.setPassword(password);
        }

        user.setTeam("MONSTERS");
        Users users = userRepository.save(user.toEntity(uuid, cloudFrontUrl));

        if (user.getPlayers() != null) {
            user.getPlayers().forEach(playerId -> {
                Player player = playerRepository.findById(playerId)
                        .orElseThrow(() -> new CustomException(PLAYER_NOT_FOUND));

                UserPlayer userPlayer = UserPlayer.builder()
                        .userPlayerPK(new UserPlayerPK(users.getId(), playerId))
                        .user(users)
                        .player(player)
                        .pushAlert(true)
                        .build();

                userPlayerRepository.save(userPlayer);

                // 최애 채팅방
                ChatRoom chatRoom = chatRoomRepository.findById(playerId)
                        .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

                ChatPart chatPart = ChatPart.builder()
                        .chatPartPK(new ChatPartPK(users.getId(), chatRoom.getId()))
                        .user(users)
                        .room(chatRoom)
                        .lastReadTime(LocalDateTime.now())
                        .build();

                chatPartRepository.save(chatPart);
            });
        }

        // 팀 채팅방
        ChatRoom teamChatRoom = chatRoomRepository.findById(1000L)
                .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

        ChatPart chatPart = ChatPart.builder()
                .chatPartPK(new ChatPartPK(users.getId(), teamChatRoom.getId()))
                .user(users)
                .room(teamChatRoom)
                .lastReadTime(LocalDateTime.now())
                .build();

        chatPartRepository.save(chatPart);

        JwtRedis jwtRedis = user.toRedis(uuid, users.getId(), jwtService.createRefreshToken(uuid));
        redisUtils.setData(uuid, jwtRedis);

        Photocard photoCard = Photocard.builder()
                .createdAt(LocalDateTime.now())
                .user(users)
                .imgUrl(cloudFrontUrl+"asset/basic.png")
                .build();

        photocardRepository.save(photoCard);

        return jwtService.createAccessToken(uuid);
    }

    @Transactional
    @Override
    public void modifyAlert(AlertModifyReq req, Long userId) {
        queryFactory.update(users)
                .set(users.pushAlert, req.isPushAlert())
                .where(users.id.eq(userId))
                .execute();
    }

    @Transactional
    @Override
    public void modifyTheme(ThemeModifyReq req, Long userId) {
        queryFactory.update(users)
                .set(users.theme, Theme.valueOf(req.getTheme().toUpperCase()))
                .where(users.id.eq(userId))
                .execute();
    }

    @Transactional
    @Override
    public ProfileModifyRes modifyProfile(ProfileModifyReq req, MultipartFile file, Long userId) throws IOException {
        Users user = userRepository.findById(userId).orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        user.updateIntroduce(req.getIntroduce());
        user.updateNickname(req.getNickname());

        if (file != null && !file.isEmpty()) {
            if (!user.getProfileUrl().isEmpty() && !user.getProfileUrl().equals(cloudFrontUrl + "profile/no_profile.png")) {
                s3Service.fileDelete(user.getProfileUrl());
            }
            String imgUrl = s3Service.upload(file, "profile");
            user.updateProfileUrl(imgUrl);
        }

        userRepository.save(user);
        ProfileModifyRes res = ProfileModifyRes.builder().build();

        return res.toDto(user);
    }

    @Override
    public UserDetailsRes findUserDetails(Long myUserId, String uuid) {
        Users user = userRepository.findByUuid(uuid).orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        if (user == null) throw new CustomException(PROFILE_NOT_FOUND);
        String isFriend = (friendService.isFriend(myUserId, user.getId()) != null) ? friendService.isFriend(myUserId, user.getId()).toString() : null;

        if (isFriend == null) isFriend = "NOT_FRIEND";
        UserDetailsRes userDetail = UserDetailsRes.builder().build();

        return userDetail.toDto(user, isFriend);
    }

    @Override
    public MyDetailsRes findMyDetails(Long userId) {
        return userRepository.findUserDetailsWithCounts(userId);
    }

    @Transactional
    @Override
    public void passwordReset(PasswordResetReq req) {
        JwtRedis jwtRedis = (JwtRedis) redisUtils.getData(req.getUuid());

        if (jwtRedis == null) {
            throw new CustomException(TEMP_PASSWORD_TIMEOUT);
        }

        if (!req.getPassword().equals(req.getConfirmPassword())) {
            throw new CustomException(PASSWORD_NOT_MATCH);
        }

        if (jwtRedis.getVerify().equals(req.getVerify())) {
            Users user = userRepository.findByUuid(jwtRedis.getUuid())
                    .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
            user.updatePassword(passwordEncoder.encode(req.getPassword()));
            userRepository.save(user);
            redisUtils.deleteData(user.getUuid());
            return;
        }

        throw new CustomException(VERIFY_NOT_MATCH);
    }

    @Transactional
    @Override
    public void modifyPassword(PasswordModifyReq req, Long userId) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        if (req.getNewPassword().equals(req.getConfirmPassword())
                && passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
            user.updatePassword(passwordEncoder.encode(req.getNewPassword()));
        }

        userRepository.save(user);
    }

    @Override
    public void passwordResetSend(PasswordResetSendReq req) {
        Users user = userRepository.findByEmail(req.getEmail());

        if (user == null) {
            throw new CustomException(USER_NOT_FOUND);
        }

        if (!mailService.isValidEmail(req.getEmail())) {
            throw new CustomException(INVALID_EMAIL);
        }
        //email로 비밀번호 재설정 email 전송
        String key = UUID.randomUUID().toString();
        String verify_key = "";
        verify_key = mailService.sendPasswordResetMail(req.getEmail(), key);
        JwtRedis jwtRedis = JwtRedis.builder()
                .uuid(user.getUuid())
                .verify(verify_key)
                .build();
        //redis에 key: email
        redisUtils.setDataWithExpiration(key, jwtRedis, 300L);
    }

    @Override
    public SearchUserRes searchUser(Long userId, Long lastUserId, Pageable pageable) {
        Slice<SearchUserDto> users = userRepository.findUserByCursor(userId, lastUserId, pageable);

        SliceDto<SearchUserDto> postDtoSliceDto = new SliceDto<>(users);

        return SearchUserRes.toDto(postDtoSliceDto);
    }

    @Override
    @Transactional
    public void modifyUserFavorite(Long userId, UserFavoriteReq userFavoriteReq) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        Team currentTeam = user.getTeam();

        if (userFavoriteReq.getTeamId() != null && !Objects.equals(currentTeam.getId(), userFavoriteReq.getTeamId())) {
            Team newTeam = teamRepository.findById(userFavoriteReq.getTeamId())
                    .orElseThrow(() -> new CustomException(TEAM_NOT_FOUND));

            user.updateTeam(newTeam);

            chatPartRepository.deleteById(new ChatPartPK(userId, currentTeam.getId()));

            ChatRoom newTeamChatRoom = chatRoomRepository.findById(newTeam.getId())
                    .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

            ChatPart newTeamChatPart = ChatPart.builder()
                    .chatPartPK(new ChatPartPK(userId, newTeamChatRoom.getId()))
                    .user(user)
                    .room(newTeamChatRoom)
                    .lastReadTime(LocalDateTime.now())
                    .build();

            chatPartRepository.save(newTeamChatPart);
        }

        List<UserPlayer> currentPlayers = userPlayerRepository.findByUserId(userId);
        Set<Long> currentPlayerIds = currentPlayers.stream()
                .map(up -> up.getUserPlayerPK().getPlayerId())
                .collect(Collectors.toSet());

        Set<Long> newPlayerIdSet = userFavoriteReq.getPlayers() != null ? Set.copyOf(userFavoriteReq.getPlayers()) : Set.of();

        List<UserPlayer> playersToRemove = currentPlayers.stream()
                .filter(up -> !newPlayerIdSet.contains(up.getUserPlayerPK().getPlayerId()))
                .collect(Collectors.toList());

        List<Long> playersToAdd = userFavoriteReq.getPlayers() != null
                ? userFavoriteReq.getPlayers().stream()
                .filter(pid -> !currentPlayerIds.contains(pid))
                .collect(Collectors.toList())
                : List.of();

        userPlayerRepository.deleteAll(playersToRemove);

        playersToRemove.forEach(up -> {
            chatPartRepository.deleteById(new ChatPartPK(userId, up.getUserPlayerPK().getPlayerId()));
        });

        playersToAdd.forEach(playerId -> {
            Player player = playerRepository.findById(playerId)
                    .orElseThrow(() -> new CustomException(PLAYER_NOT_FOUND));
            UserPlayerPK userPlayerPK = new UserPlayerPK(userId, playerId);
            UserPlayer userPlayer = UserPlayer.builder()
                    .userPlayerPK(userPlayerPK)
                    .user(user)
                    .player(player)
                    .pushAlert(true)
                    .build();

            userPlayerRepository.save(userPlayer);

            ChatRoom chatRoom = chatRoomRepository.findById(playerId)
                    .orElseThrow(() -> new CustomException(CHATROOM_NOT_FOUND));

            ChatPart chatPart = ChatPart.builder()
                    .chatPartPK(new ChatPartPK(userId, chatRoom.getId()))
                    .user(user)
                    .room(chatRoom)
                    .lastReadTime(LocalDateTime.now())
                    .build();

            chatPartRepository.save(chatPart);
        });
    }

    @Override
    public void verifyNickname(String nickname) {
        Users user = userRepository.findByNickname(nickname);

        if (user == null) return;

        throw new CustomException(ALREADY_EXIST_NICKNAME);
    }

    @Override
    public void sendEmail(EmailSendReq req) {
        Users user = userRepository.findByEmail(req.getEmail());

        if (user == null) {
            String verify = mailService.sendVerifyEmail(req.getEmail());
            redisUtils.setDataWithExpiration(req.getEmail() + "_verify", verify, 500L);
            return;
        }

        throw new CustomException(ALREADY_EXIST_USER);
    }

    @Override
    public void verifyEmail(EmailVerifyReq req) {
        String verify = (String) redisUtils.getData(req.getEmail() + "_verify");

        if (verify == null) {
            throw new CustomException(NOT_EXIST_VERIFY);
        }

        if (!verify.equals(req.getVerifyCode())) {
            throw new CustomException(VERIFY_NOT_MATCH);
        }
    }

    @Override
    public SearchNicknameRes findUserByNickName(String nickname) {
        List<Users> users = userRepository.findUsersByNickname(nickname);

        List<SearchUserDto> userList = users.stream()
                .map(SearchUserDto::toDto)
                .toList();

        return SearchNicknameRes.toDto(userList);
    }

    @Override
    @Transactional
    public void modifyPlayAlert(AlertModifyReq alertModifyReq, Long userId) {
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        user.updatePlayPushAlert(alertModifyReq.isPushAlert());

        userRepository.save(user);
    }
}
