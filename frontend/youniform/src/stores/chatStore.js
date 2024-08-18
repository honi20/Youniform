import { create } from "zustand";
import * as Stomp from "@stomp/stompjs";
import { getApiClient } from "@stores/apiClient";
import useUserStore from "./userStore";
const MESSAGE_TYPE = {
  MESSAGE: "MESSAGE",
  ENTRY: "ENTRY",
  EXIT: "EXIT",
  HEARTBEAT: "HEARTBEAT",
  USERCOUNT: "USERCOUNT",
};
const useChatStore = create((set, get) => ({
  messages: [],
  content: "",
  chatRooms: [], // 전체 룸. axios 이용해서 fetch 필요함
  selectedRoom: null,
  client: null, // WebSocket 클라이언트
  isConnected: false, // WebSocket 연결 상태
  heartbeatInterval: null, // 하트비트 타이머 ID
  connectedUsers: 0, // 현재 접속자 수
  type: null,
  connect: () => {
    const { client, selectedRoom, isConnected, fetchChatRoomMessage, enterChatRoom } = get();
    const { user } = useUserStore.getState();
    if (!selectedRoom) {
      console.warn("selectedRoom이 설정되지 않았습니다.");
      return;
    }
    if (client && isConnected) {
      console.log("이미 연결되어 있습니다.");
      return;
    }

    const token = window.localStorage.getItem("accessToken");
    console.log("Retrieved token from localStorage:", token);

    const newClient = new Stomp.Client({
      brokerURL: "wss://youniform.site/api/stomp/chat",
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("websocket 연결 성공", selectedRoom);
        // enterChatRoom(content.nickname, content.imageUrl);
        set({ isConnected: true });
        fetchChatRoomMessage();
        enterChatRoom(user.nickname);
        // 하트비트 전송 시작
        const intervalId = setInterval(() => {
          const { client, selectedRoom, isConnected } = get();
          if (isConnected && client && client.connected) {
            get().sendHeartbeat();
          }
        }, 5000);
        set({ heartbeatInterval: intervalId });

        // 채팅 메시지 수신 구독
        newClient.subscribe(`/sub/${selectedRoom}`, (message) => {
          try {
            const receivedMessage = JSON.parse(message.body);
            console.log("subscribe", receivedMessage);
            set((state) => ({
              messages: [...state.messages, receivedMessage],
            }));
          } catch (e) {
            console.error("메시지 파싱 오류", e);
          }
        });
      },

      onStompError: (frame) => {
        console.error("STOMP 오류", frame);
      },
      onDisconnect: () => {
        set({ isConnected: false });
        console.log("websocket 연결 해제");
        if (heartbeatInterval) {
          clearInterval(heartbeatInterval); // 하트비트 타이머 중지
        }
        set({ client: null, heartbeatInterval: null });
      },
    });

    newClient.activate();
    set({ client: newClient });
  },

  disconnect: () => {
    const { client, heartbeatInterval,leaveChatRoom } = get();
    const { user } = useUserStore.getState();
    if (client) {
      client.deactivate();
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval); // 하트비트 타이머 중지
      }
      leaveChatRoom(user.nickname)
      set({ client: null, isConnected: false, heartbeatInterval: null });
    }
  },

  fetchChatRoom: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/chats/rooms`);
      console.log(res.data.header.message);
      console.log(res.data.body);

      set({
        chatRooms: res.data.body.chatRoomList,
      });
    } catch (error) {
      console.log("Failed to fetch chat rooms", error);
      set({ loading: false, error: error.message });
    }
  },

  fetchChatRoomMessage: async () => {
    const { selectedRoom, messages } = get();
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/chats/rooms/${selectedRoom}`);
      console.log("채팅방 메세지 fetch");
      console.log(res.data.body.messages.content);

      set({ messages: res.data.body.messages.content });
      // console.log(messages);
    } catch (error) {
      console.log("Failed to fetch chat room messages", error);
    }
  },

  toggleChatListVisibility: () =>
    set((state) => ({ isChatListVisible: !state.isChatListVisible })),

  setContent: (content) => set({ content }),
  setType: (type) => set({ type }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setSelectedRoom: (room) => set({ selectedRoom: room }),

  sendMessage: (nickname, imageUrl, type = MESSAGE_TYPE.MESSAGE) => {
    const { content, client, selectedRoom, isConnected } = get();

    if (content.trim() === "") return;
    if (!isConnected) {
      console.error("STOMP 클라이언트가 연결되지 않았습니다.");
      return;
    }

    console.log("메세지 보냄", client);
    const now = new Date();
    const formattedDate = now.toISOString();
    const message = {
      nickname,
      imageUrl,
      content,
      type,
      messageTime: formattedDate,
    };

    if (client) {
      console.log("메시지 전송", client);
      client.publish({
        destination: `/pub/${selectedRoom}`,
        body: JSON.stringify(message),
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      });

      set({ content: "" });
    }
  },

  submitImage: async (formData) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post(`/chats/messages/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      });
      console.log(res.data.header);
      console.log(res.data.body.imageUrl);
      return res.data.body.imageUrl;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },

  fetchPreviousMessages: async () => {
    const { selectedRoom, messages, setMessages } = get();
    if (!selectedRoom) return;

    const apiClient = getApiClient();
    try {
      const earliestMessageId = messages.length > 0 ? messages[0].id : 0;
      console.log(earliestMessageId);
      const res = await apiClient.get(
        `/chats/messages/${selectedRoom}/previous`,
        {
          params: {
            messageId: earliestMessageId, // Last loaded message ID
            size: 10, // Number of messages to load
          },
        }
      );

      const previousMessages = res.data.body || [];

      set((state) => ({
        messages: [...previousMessages, ...state.messages],
      }));
    } catch (error) {
      console.log("Failed to fetch previous messages", error);
    }
  },
  enterChatRoom: async (nickname) => {
    const { client, selectedRoom, addMessage } = get();

    console.log("entry test")
    // 입장 메시지 전송
    const now = new Date();
    const formattedDate = now.toISOString();
    const entryMessage = {
      nickname,
      type: MESSAGE_TYPE.ENTRY,
      messageTime: formattedDate,
    };

    if (client) {
      client.publish({
        destination: `/pub/${selectedRoom}`,
        body: JSON.stringify(entryMessage),
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      });

      console.log(`${nickname}님이 채팅방에 입장했습니다.`);
      // addMessage(entryMessage)
    }
  },

  leaveChatRoom: async (nickname) => {
    const { client, selectedRoom } = get();

    // 퇴장 메시지 전송
    const now = new Date();
    const formattedDate = now.toISOString();
    const exitMessage = {
      nickname,
      type: MESSAGE_TYPE.EXIT,
      messageTime: formattedDate,
    };

    if (client) {
      client.publish({
        destination: `/pub/${selectedRoom}`,
        body: JSON.stringify(exitMessage),
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      });

      console.log(`${nickname}님이 채팅방을 나갔습니다.`);
    }
  },

  sendHeartbeat: () => {
    const { client, selectedRoom, isConnected } = get();

    if (!isConnected || !selectedRoom) {
      console.error("STOMP 클라이언트가 연결되지 않았거나 선택된 채팅방이 없습니다.");
      return;
    }

    // 하트비트 메시지 전송
    const now = new Date();
    const formattedDate = now.toISOString();
    const heartbeatMessage = {
      type: MESSAGE_TYPE.HEARTBEAT,
      messageTime: formattedDate,
    };

    if (client) {
      client.publish({
        destination: `/pub/${selectedRoom}`,
        body: JSON.stringify(heartbeatMessage),
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      });

      console.log("하트비트 메시지를 전송했습니다.");
    }
  },
}));

export default useChatStore;
