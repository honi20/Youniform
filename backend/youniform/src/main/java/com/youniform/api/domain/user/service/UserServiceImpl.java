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
}
