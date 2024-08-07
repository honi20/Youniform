package com.youniform.api.domain.user.service;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.youniform.api.domain.friend.service.FriendService;
import com.youniform.api.domain.user.dto.*;
import com.youniform.api.domain.user.entity.Theme;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.entity.JwtRedis;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.mail.service.MailService;
import com.youniform.api.global.redis.RedisUtils;
import com.youniform.api.global.s3.S3Service;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

import static com.youniform.api.domain.user.entity.QUsers.users;
import static com.youniform.api.global.statuscode.ErrorCode.*;
import static com.youniform.api.global.statuscode.ErrorCode.PROFILE_NOT_FOUND;
import static com.youniform.api.global.statuscode.ErrorCode.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RedisUtils redisUtils;
    private final JwtService jwtService;
    private final JPAQueryFactory queryFactory;
    private final PasswordEncoder passwordEncoder;
    private final FriendService friendService;
    private final S3Service s3Service;
    private final MailService mailService;

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
        if(users != null && passwordEncoder.matches(user.getPassword(), users.getPassword())) {
            return jwtService.createAccessToken(users.getUuid());
        }
        throw new CustomException(USER_NOT_FOUND);
    }

    @Override
    public String signup(SignupReq user) {
        String uuid = UUID.randomUUID().toString();

        if(user.getProviderType().equals("local")) {
            String password = passwordEncoder.encode(user.getPassword());
            user.setPassword(password);
        }

        user.setTeam("MONSTERS");
        Users users = userRepository.save(user.toEntity(uuid));

        JwtRedis jwtRedis = user.toRedis(uuid, users.getId(), jwtService.createRefreshToken(uuid));
        redisUtils.setData(uuid, jwtRedis);

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

        if(!file.isEmpty()) {
            if(!user.getProfileUrl().isEmpty()) {
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
    public UserDetailsRes findUserDetails(Long myUserId, String uuid){
        Users user = userRepository.findByUuid(uuid).orElseThrow(() -> new CustomException(USER_NOT_FOUND));
        if(user == null) throw new CustomException(PROFILE_NOT_FOUND);
        String isFriend = friendService.isFriend(myUserId, user.getId()).toString();
        if(isFriend == null) isFriend = "NOT_FRIEND";
        UserDetailsRes userDetail = UserDetailsRes.builder().build();
        return userDetail.toDto(user, isFriend);
    }

    @Override
    public MyDetailsRes findMyDetails(Long userId) {
        Users myDetail = userRepository.findById(userId).orElseThrow();
        MyDetailsRes myDetails = MyDetailsRes.builder().build();
        return myDetails.toDto(myDetail);
    }

    @Override
    public void passwordReset(PasswordResetReq req) {
        JwtRedis jwtRedis = (JwtRedis) redisUtils.getData(req.getUuid());
        if(jwtRedis == null) {
            throw new CustomException(TEMP_PASSWORD_TIMEOUT);
        }
        if(!req.getPassword().equals(req.getConfirmPassword())){
            throw new CustomException(PASSWORD_NOT_MATCH);
        }
        if(jwtRedis.getVerify().equals(req.getVerify())){
            Users user = userRepository.findByUuid(req.getUuid())
                    .orElseThrow(() -> new CustomException(USER_NOT_FOUND));
            user.updatePassword(passwordEncoder.encode(req.getPassword()));
            userRepository.save(user);
            redisUtils.deleteData(user.getUuid());
            return;
        }
        throw new CustomException(VERIFY_NOT_MATCH);
    }

    @Override
    public void modifyPassword(PasswordModifyReq req, Long userId) {
        Users user = userRepository.findById(userId).orElseThrow(() -> new CustomException(USER_NOT_FOUND));

        if(req.getNewPassword().equals(req.getConfirmPassword())
                && passwordEncoder.matches(req.getCurrentPassword(), user.getPassword())) {
            user.updatePassword(passwordEncoder.encode(req.getNewPassword()));
        }
        userRepository.save(user);
    }

    @Override
    public void passwordResetSend(PasswordResetSendReq req) {
        Users user = userRepository.findByEmail(req.getEmail());
        if(user == null){
            throw new CustomException(USER_NOT_FOUND);
        }
        if(!mailService.isValidEmail(req.getEmail())){
            throw new CustomException(INVALID_EMAIL);
        }
        //email로 비밀번호 재설정 email 전송
        String verify_key = "";
        verify_key = mailService.sendMail(req.getEmail(), user.getUuid());
        JwtRedis jwtRedis = JwtRedis.builder()
                .uuid(user.getUuid())
                .verify(verify_key)
                .build();
        //redis에 key: email
        redisUtils.setDataWithExpiration(user.getUuid(), jwtRedis, System.currentTimeMillis() + (600_000));
    }
}
