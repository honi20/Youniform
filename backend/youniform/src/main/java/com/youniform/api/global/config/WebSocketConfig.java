package com.youniform.api.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * 메시지 브로커 구성
     * - 클라이언트에게 브로드캐스트할 때 사용할 주제 정의
     * - 클라이언트에서 서버로 메시지를 보낼 때 사용할 애플리케이션 목적지 접두사 설정
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        // "/sub"로 시작하는 목적지로 메시지 전달
        config.enableSimpleBroker("/sub");
        // 클라이언트가 서버로 메시지를 보낼 때 사용할 접두사 지정
        config.setApplicationDestinationPrefixes("/pub");
    }

    /**
     * STOMP 엔드포인트 등록
     * - 클라이언트가 WebSocket 연결을 맺기 위해 사용할 엔드포인트 URL 지정
     * - "/stomp/chat" URL로 WebSocket 연결을 맺음
     * - withSockJS()는 WebSocket을 지원하지 않는 브라우저에서도 동작하도록 폴백 옵션 제공
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stomp/chat")
                .setAllowedOriginPatterns("*");  // 모든 도메인 허용
        //.withSockJS();  // SockJS 폴백 옵션 (필요에 따라 주석 해제)

        // 필요시 다른 엔드포인트 추가
        // registry.addEndpoint("/stomp/anotherEndpoint")
        //         .setAllowedOriginPatterns("*")
        //         .withSockJS();
    }

    /**
     * WebSocket 전송 설정
     * - 메시지 크기 제한 설정
     * - 전송 버퍼 크기 제한 설정
     * - 전송 시간 제한 설정
     */
    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.setMessageSizeLimit(8192)  // 메시지 크기 제한 (기본: 64KB)
                .setSendBufferSizeLimit(8192)  // 전송 버퍼 크기 제한
                .setSendTimeLimit(10000);      // 전송 시간 제한 (밀리초)
    }
}