package com.youniform.api.domain.user.service;

import com.youniform.api.domain.user.dto.LocalSigninReq;
import com.youniform.api.domain.user.dto.SignupReq;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.jwt.entity.JwtRedis;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.redis.RedisUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final RedisUtils redisUtils;
    private final JwtService jwtService;

    @Override
    public Users findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public String signin(LocalSigninReq user) {
        //사용자가 있으면 accessToken 없으면 null
        Users users = findByEmail(user.getEmail());
        if (users == null) {
            return null;
        }
        return jwtService.createAccessToken(users.getUuid());
    }

    @Override
    public String signup(SignupReq user) {
        String uuid = UUID.randomUUID().toString();
        Users users = userRepository.save(user.toEntity(uuid));

        JwtRedis jwtRedis = user.toRedis(uuid, users.getId(), jwtService.createRefreshToken(uuid));
        redisUtils.setData(uuid, jwtRedis);

        return jwtService.createAccessToken(uuid);
    }
}
