//package com.youniform.api.domain.chat.controller;

//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@AutoConfigureMockMvc
//@AutoConfigureRestDocs
//@ExtendWith(RestDocumentationExtension.class)
//@DisplayName("WebSocketController 테스트")
//public class WebSocketControllerTest {
//
//    @MockBean
//    private ChatService chatService;
//
//    private WebSocketStompClient stompClient;
//
//    private StompSession stompSession;
//
//    private final String WEBSOCKET_URI = "ws://localhost:8080/stomp/chat";
//
//    @BeforeEach
//    public void setup() throws Exception {
//        stompClient = new WebSocketStompClient(new StandardWebSocketClient());
//        stompClient.setMessageConverter(new MappingJackson2MessageConverter());
//
//        stompSession = stompClient.connect(WEBSOCKET_URI, new StompSessionHandlerAdapter() {
//        }).get(5, TimeUnit.SECONDS);
//    }
//
//    @Test
//    @DisplayName("메시지 전송 및 수신 테스트")
//    public void 메시지_전송_및_수신_성공() throws Exception {
//        ChatMessage chatMessage = ChatMessage.builder()
//                .roomId(1L)
//                .userId(123L)
//                .nickname("유저 1")
//                .content("전송 테스트")
//                .imageUrl("image.png")
//                .build();
//
//        when(chatService.processChatMessage(anyLong(), any(ChatMessage.class))).thenReturn(chatMessage);
//
//        LinkedBlockingQueue<ChatMessage> blockingQueue = new LinkedBlockingQueue<>();
//
//        stompSession.subscribe("/sub/1", new StompSessionHandlerAdapter() {
//            @Override
//            public void handleFrame(StompHeaders headers, Object payload) {
//                blockingQueue.offer((ChatMessage) payload);
//            }
//
//            @Override
//            public Type getPayloadType(StompHeaders headers) {
//                return ChatMessage.class;
//            }
//        });
//
//        stompSession.send("/app/1", chatMessage);
//
//        ChatMessage receivedMessage = blockingQueue.poll(5, TimeUnit.SECONDS);
//        assertThat(receivedMessage).isNotNull();
//        assertThat(receivedMessage.getContent()).isEqualTo("전송 테스트");
//        assertThat(receivedMessage.getNickname()).isEqualTo("유저 1");
//    }
//}