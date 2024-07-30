package com.youniform.api.global.jwt.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.youniform.api.domain.user.role.UserRole;
import com.youniform.api.global.jwt.entity.JwtRedis;
import com.youniform.api.global.redis.RedisUtils;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {
    //== jwt.yml에 설정된 값 가져오기 ==//
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.access.expiration}")
    private long accessTokenValidityInSeconds;

    @Value("${jwt.refresh.expiration}")
    private long refreshTokenValidityInSeconds;

    private final RedisUtils redisUtils;
    private static final String ISSUER = "www.samsung.com";
    private static final String ACCESS_TOKEN_CLAIM_NAME = "access_token";
    private static final String REFRESH_TOKEN_CLAIM_NAME = "refresh_token";

    @Override
    public String createAccessToken(String uuid) {
        return JWT.create()
                .withSubject(uuid)
                .withClaim("type", ACCESS_TOKEN_CLAIM_NAME)
                .withIssuer(ISSUER)
                .withExpiresAt(new Date(System.currentTimeMillis() + accessTokenValidityInSeconds * 1000))
                .sign(Algorithm.HMAC512(secret));
    }

    @PostConstruct
    public void init() {
        String UUID = "1604b772-adc0-4212-8a90-81186c57f598";
        String accessToken = createAccessToken(UUID);
        String refreshToken = createRefreshToken(UUID);
        System.out.println("accessToken = " + accessToken);
        System.out.println("refreshToken = " + refreshToken);
        JwtRedis redis = new JwtRedis();
        redis.setRefreshToken(refreshToken);
        redis.setUuid(UUID);
        redis.setUserId(123L);
        redisUtils.setData(UUID, redis);
    }

    @Override
    public String createRefreshToken(String uuid) {
        return JWT.create()
                .withSubject(uuid)
                .withClaim("type", REFRESH_TOKEN_CLAIM_NAME)
                .withIssuer(ISSUER)
                .withExpiresAt(new Date(System.currentTimeMillis() + refreshTokenValidityInSeconds * 1000))
                .sign(Algorithm.HMAC512(secret));
    }

    @Override
    public String getClaim(String token){
        try {
            return JWT.decode(token).getClaim("type").asString();
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public String getUuid(String token) {
        return JWT.decode(token).getSubject();
    }

    @Override
    public Authentication getAuthentication(String accessToken) {
        String uuid = JWT.decode(accessToken).getSubject();
        JwtRedis jwtRedis = (JwtRedis)redisUtils.getData(uuid);
        Long userId = jwtRedis.getUserId();
        return new UsernamePasswordAuthenticationToken(userId, accessToken, List.of(UserRole.ROLE_USER));
    }

    @Override
    public boolean isTokenValid(String token) {
        try {
            DecodedJWT decode = JWT
                    .require(Algorithm.HMAC512(secret))
                    .build()
                    .verify(token);
            return decode.getIssuer().equals(ISSUER);
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean isTokenExpired(String token) {
        try {
            DecodedJWT decoded = JWT.decode(token);
            String type = decoded.getClaim("type").asString();
            String uuid = decoded.getSubject();

            if(type.equals(REFRESH_TOKEN_CLAIM_NAME)){
                Long expires = decoded.getExpiresAt().getTime() - new Date().getTime();
                long diffInDays = TimeUnit.MILLISECONDS.toDays(expires);
                if (diffInDays < 3 && expires > 0) {//redis에 있는 refreshToken 재발급
                    JwtRedis jwtRedis = (JwtRedis) redisUtils.getData(uuid);
                    jwtRedis.setRefreshToken(createRefreshToken(uuid));
                    redisUtils.setData(uuid, jwtRedis);
                    return false;
                } else return diffInDays < 3;
            }
            return JWT.decode(token).getExpiresAt().before(new Date());
        } catch(Exception e){
            return true;
        }
    }
}
