package com.youniform.api.global.config;

import com.youniform.api.global.jwt.service.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

import java.security.Principal;
import java.util.Map;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer, ChannelInterceptor {
    private final JwtService jwtService;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.setApplicationDestinationPrefixes("/pub");
        config.enableSimpleBroker("/sub");

        log.info("WebSocketConfig configureMessageBroker");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/stomp/chat")
                .setAllowedOriginPatterns("*")
                .setHandshakeHandler(new DefaultHandshakeHandler() {
                    @Override
                    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
                        String token = request.getHeaders().getFirst("Authorization");
                        log.info("token: " + token);
                        log.info("request" + request.getPrincipal());
                        log.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!token11111: {}", token);
                        if (token != null && token.startsWith("Bearer ")) {
                            token = token.substring(7);
                            log.info("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!token: {}", token);
                            Long userId = (Long) jwtService.getAuthentication(token).getPrincipal();
                            if (userId != null) {
                                return userId::toString;
                            }
                        }
                        log.info("!!!!!!!!!!!!!!!!!!!!!!에러에러에러에러");
                        return null; // 인증 실패 시 연결 차단
                    }
                });
//                .setHandshakeHandler(new DefaultHandshakeHandler() {
//                    @Override
//                    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler, Map<String, Object> attributes) {
//                        // 토큰에서 userId 추출
//
//                        try {
//                            Long userId = jwtService.getUserId(SecurityContextHolder.getContext());
//                            return userId::toString;  // Principal로 반환
//                        } catch (NumberFormatException e) {
//                            log.error("Invalid userId format: {}", SecurityContextHolder.getContext().getAuthentication().getCredentials(), e);
//                            throw new IllegalArgumentException("Invalid userId format");
//                        }
//                    }
//                })
//                .withSockJS();

        log.info("WebSocketConfig registerStompEndpoints");
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(8192)
                .setSendBufferSizeLimit(8192)
                .setSendTimeLimit(10000);

        log.info("WebSocketConfig configureWebSocketTransport log");
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(message);
        System.out.println("full message:" + message);
        System.out.println("auth:" + headerAccessor.getNativeHeader("Authorization"));
        System.out.println(headerAccessor.getHeader("nativeHeaders").getClass());
        if (StompCommand.CONNECT.equals(headerAccessor.getCommand())) {
            System.out.println("msg: " + "conne");
        }
        //throw new MessagingException("no permission! ");
        return message;
    }
}
