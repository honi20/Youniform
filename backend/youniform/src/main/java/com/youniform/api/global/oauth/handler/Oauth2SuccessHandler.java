package com.youniform.api.global.oauth.handler;

import com.youniform.api.domain.user.dto.SignupReq;
import com.youniform.api.domain.user.entity.Users;
import com.youniform.api.domain.user.repository.UserRepository;
import com.youniform.api.global.exception.CustomException;
import com.youniform.api.global.jwt.entity.JwtRedis;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.oauth.PrincipalDetails;
import com.youniform.api.global.redis.RedisUtils;
import com.youniform.api.global.statuscode.ErrorCode;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Objects;

@RequiredArgsConstructor
@Component
@Slf4j
public class Oauth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final RedisUtils redisUtils;
    private final UserRepository userRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {
        log.info("성공성공!!");
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Users user = userRepository.findByEmailAndProviderType(
                ((PrincipalDetails)authentication.getPrincipal()).getPassword(),
                        ((PrincipalDetails) oAuth2User).getUser().getProviderType());
        if(user == null) {
            user = ((PrincipalDetails)oAuth2User).getUser();
            sendSignUpUserInfo(response, user);
        }else {
            if(Objects.equals(((PrincipalDetails) authentication.getPrincipal()).getUser().getProviderType(), user.getProviderType())){
                sendAccessToken(response, user);
            }else{
                response.sendRedirect("https://youniform.site/signup/error?providerType=" + user.getProviderType());
            }
        }
    }

    //회원가입 절차 마저 진행하기 위해 email, nickname, profileUrl 전달
    public void sendSignUpUserInfo(HttpServletResponse response, Users user) throws IOException {
        if (!response.isCommitted()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);

            SignupReq result = SignupReq.builder()
                    .email(user.getEmail())
                    .nickname(user.getNickname())
                    .providerType(user.getProviderType())
                    .profileUrl(user.getProfileUrl())
                    .build();

//            ResponseDto<Object> res = ResponseDto.success(SuccessCode.USER_SIGNUP_USER, result);
//            ObjectMapper mapper = new ObjectMapper();
//            response.getWriter().write(mapper.writeValueAsString(res));

            redisUtils.setDataWithExpiration(result.getEmail()+"_signin_key", result, System.currentTimeMillis() + (10_000));

//            response.sendRedirect("https://youniform/signup/info?key=" + result.getEmail());
            response.sendRedirect("https://youniform.site/signup/info?key=" + result.getEmail());
            log.info("redirect 성공!!!!!!!!!!!!!" + result.getEmail());
        }
    }

    //기존 회원 정보가 있는 경우 UUID 기반 accessToken 반환
    public void sendAccessToken(HttpServletResponse response, Users user) throws IOException {
        if (!response.isCommitted()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);

            String uuid = user.getUuid();
            JwtRedis jwtRedis = JwtRedis.builder()
                    .uuid(uuid)
                    .userId(user.getId())
                    .refreshToken(jwtService.createRefreshToken(uuid))
                    .build();
            redisUtils.setData(uuid, jwtRedis);

//            ResponseDto<Object> res = ResponseDto.success(SuccessCode.USER_SIGNUP_EXIST, jwtService.createAccessToken(uuid));
//            ObjectMapper mapper = new ObjectMapper();
//            response.getWriter().write(mapper.writeValueAsString(res));
            String accessToken = jwtService.createAccessToken(uuid);
            response.sendRedirect("https://youniform.site/signup/exist?key=" + accessToken);
        }
    }
}
