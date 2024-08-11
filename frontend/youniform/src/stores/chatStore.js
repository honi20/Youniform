import { create } from "zustand";
import axios from "axios";
import * as Stomp from "@stomp/stompjs";
import { getApiClient } from "@stores/apiClient";
const useChatStore = create((set, get) => ({
  messages: [],
  content: "",
  // user: null,
  isChatListVisible: false,
  chatRooms: [], // 전체 룸. axios 이용해서 fetch 필요함
  selectedRoom: null,
  client: null, // WebSocket 클라이언트
  connect: () => {
    const { client, selectedRoom } = get();
    if (!selectedRoom) {
      console.warn("selectedRoom이 설정되지 않았습니다.");
      return;
    }
    if (client) {
      console.log("client가 있음");
      return;
    }

    const newClient = new Stomp.Client({
      brokerURL: "ws://i11a308.p.ssafy.io:8080/stomp/chat",
      onConnect: () => {
        console.log("websocket 연결 성공");
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
    });
    newClient.activate();
    set({ client: newClient });
  },
  disconnect: () => {
    const { client } = get();
    if (client) {
      client.deactivate();
      set({ client: null });
    }
  },

  fetchChatRoom: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(
        `/chats/rooms`
      );
      console.log(res.data.header.message);
      console.log(res.data.body);
      console.log(res.data.body.chatRoomList);

      set({
        chatRooms: res.data.body.chatRoomList,
      });
    } catch (error) {
      console.log("Failed to fetch user", error);
      set({ loading: false, error: error.message });
    }
  },

  toggleChatListVisibility: () =>
    set((state) => ({ isChatListVisible: !state.isChatListVisible })),

  setContent: (content) => set({ content }),

  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),

  setSelectedRoom: (room) => set({ selectedRoom: room }),

  sendMessage: (nickname, imageUrl) => {
    const { content, client, selectedRoom } = get();
    
    if (content.trim() === "") return;
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
      console.log("채팅방 구독 성공", client);
      client.publish({
        destination: `/pub/${selectedRoom}`,
        body: JSON.stringify(message),
      });

      set((state) => ({
        messages: [...state.messages, message],
        content: "",
      }));
    }
  },
}));
export default useChatStore;
