import { create } from "zustand";
import * as Stomp from "@stomp/stompjs";
import { getApiClient } from "@stores/apiClient";

const useChatStore = create((set, get) => ({
  messages: [],
  content: "",
  chatRooms: [], // 전체 룸. axios 이용해서 fetch 필요함
  selectedRoom: null,
  client: null, // WebSocket 클라이언트
  isConnected: false, // WebSocket 연결 상태
  //경덕
  // 하트비트 타이머 ID
  heartbeatInterval: null,
  // 현재 접속자 수
  connectedUsers: 0,

  connect: () => {
    const { client, selectedRoom, isConnected, fetchChatRoomMessage } = get();
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
      // debug: function (str) {
      //   console.log(str);
      // },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: () => {
        console.log("websocket 연결 성공", selectedRoom);
        set({ isConnected: true });
        fetchChatRoomMessage();

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
      },
    });

    newClient.activate();
    set({ client: newClient });
  },

  disconnect: () => {
    const { client, heartbeatInterval } = get();
    if (client) {
      client.deactivate();
      // 경덕
      // clearInterval(heartbeatInterval); // 하트비트 타이머 중지
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
      console.log(messages);
    } catch (error) {
      console.log("Failed to fetch chat room messages", error);
    }
  },
  toggleChatListVisibility: () =>
    set((state) => ({ isChatListVisible: !state.isChatListVisible })),

  setContent: (content) => set({ content }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setSelectedRoom: (room) => set({ selectedRoom: room }),

  sendMessage: (nickname, imageUrl) => {
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
  sendImage: async (file) => {
    const { selectedRoom } = get();
    if (!selectedRoom || !file) return;

    const apiClient = getApiClient();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await apiClient.post(`/chats/messages/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
        },
      });
      console.log(res.data.header);
      console.log(res.data.body);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },

  fetchPreviousMessages: async () => {
    const { selectedRoom, messages } = get();
    if (!selectedRoom) return;

    const apiClient = getApiClient();
    // const lastMessage = messages[0];
    // const beforeTimestamp = lastMessage
    //   ? new Date(lastMessage.messageTime).toISOString()
    //   : new Date().toISOString();

    try {
      const res = await apiClient.get(
        `/chats/messages/${selectedRoom}/previous`,
        {
          messageId: 0,
          size: 10,
        }
      );
      console.log(res.data.body);
      // const newMessages = res.data.body.messages;
      // set((state) => ({
      //   messages: [...state.messages, ...newMessages],
      // }));
    } catch (error) {
      console.log("Failed to fetch previous messages", error);
    }
  },
}));

export default useChatStore;
