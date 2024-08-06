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

import static com.youniform.api.global.statuscode.SuccessCode.REISSUED_ACCESSTOKEN;

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
        String token_type = jwtService.getClaim(token);

        if(token_type == null) {
            sendError(response, ErrorCode.NOT_VALID_TOKEN);
            return;
        }
        else if (token_type.equals("access_token")) {
            if (jwtService.isTokenValid(token)) {
                Authentication auth = jwtService.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else if (jwtService.isTokenExpired(token)) {
                String uuid = jwtService.getUuid(token);
                JwtRedis jwtRedis = (JwtRedis) redisUtils.getData(uuid);
                if (jwtRedis != null) {
                    String refreshToken = jwtRedis.getRefreshToken();
                    if (jwtService.isTokenExpired(refreshToken)) {
                        redisUtils.deleteData(uuid);
                        sendError(response, ErrorCode.EXPIRED_TOKEN);
                        return;
                    } else {
                        sendAccessToken(response, JWT.decode(token).getSubject());
                        return;
                    }
                }
                sendAccessToken(response, JWT.decode(token).getSubject());
                return;
            } else {
                sendError(response, ErrorCode.NOT_VALID_TOKEN);
                return;
            }
        }
        filterChain.doFilter(request, response);
    }

    public void sendAccessToken(HttpServletResponse response, String uuid) throws IOException {
        if (!response.isCommitted()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);

            ResponseDto<Object> res = ResponseDto.success(REISSUED_ACCESSTOKEN, jwtService.createAccessToken(uuid));
            ObjectMapper mapper = new ObjectMapper();
            response.getWriter().write(mapper.writeValueAsString(res));
        }
    }

    public void sendError(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        if (!response.isCommitted()) {
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(errorCode.getHttpStatusCode());

            ResponseDto<Object> res = ResponseDto.fail(errorCode);
            ObjectMapper mapper = new ObjectMapper();
            response.getWriter().write(mapper.writeValueAsString(res));
        }
    }

    public String extractBearerToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
