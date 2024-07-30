package com.youniform.api.global.jwt.filter;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youniform.api.global.dto.ResponseDto;
import com.youniform.api.global.jwt.entity.JwtRedis;
import com.youniform.api.global.jwt.service.JwtService;
import com.youniform.api.global.redis.RedisUtils;
import com.youniform.api.global.statuscode.ErrorCode;
import com.youniform.api.global.statuscode.SuccessCode;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Profile({"local", "prod"})
public class JwtBearerAuthenticationFilter extends GenericFilterBean {
    private final JwtService jwtService;
    private final RedisUtils redisUtils;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        String token = extractBearerToken(request);
        if (token == null) {
            filterChain.doFilter(request, response);
            return;
        }
        //토큰 타입 확인
        String token_type = jwtService.getClaim(token);

        if(token_type == null) {
            sendError(response, ErrorCode.NOT_VALID_TOKEN);
        }
        if (token_type.equals("access_token")) {
            if (jwtService.isTokenValid(token)) {//인증권한 부여
                Authentication auth = jwtService.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else if (jwtService.isTokenExpired(token)) {//accessToken 만료
                String uuid = jwtService.getUuid(token);
                JwtRedis jwtRedis = (JwtRedis) redisUtils.getData(uuid);//redis에 있는 데이터 확인
                if (jwtRedis != null) {
                    String refreshToken = jwtRedis.getRefreshToken();
                    if (jwtService.isTokenExpired(refreshToken)) {//refreshToken 만료 확인
                        redisUtils.deleteData(uuid);
                        sendError(response, ErrorCode.EXPIRED_TOKEN);//refreshToken 만료
                    } else {
                        sendAccessToken(response, JWT.decode(token).getSubject());//accessToken 재발급
                    }
                }
                sendAccessToken(response, JWT.decode(token).getSubject());//accessToken 재발급
            } else {//유효하지 않은 토큰
                sendError(response, ErrorCode.NOT_VALID_TOKEN);
            }
        }
//        else if(token_type.equals("refresh_token")) {
//            if (jwtService.isTokenValid(token)) {//accessToken 재발급
//                sendAccessToken(response, JWT.decode(token).getSubject());
//            }else if(jwtService.isTokenExpired(token)){//refreshToken 만료
//                sendError(response, ErrorCode.EXPIRED_TOKEN);
//            }else {// 유효하지 않은 토큰
//                sendError(response, ErrorCode.NOT_VALID_TOKEN);
//            }
//        }
        filterChain.doFilter(request, response);
    }

    public void sendAccessToken(HttpServletResponse response, String uuid) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);

        ResponseDto<Object> res = ResponseDto.success(SuccessCode.REISSUED_ACCESSTOKEN, jwtService.createAccessToken(uuid));
        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(res));
    }

    public void sendError(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(errorCode.getHttpStatusCode());

        ResponseDto<Object> res = ResponseDto.fail(errorCode);
        ObjectMapper mapper = new ObjectMapper();
        response.getWriter().write(mapper.writeValueAsString(res));
    }

    public String extractBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
