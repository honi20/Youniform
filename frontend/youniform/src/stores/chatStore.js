import { create } from "zustand";
import axios from "axios";
import * as Stomp from "@stomp/stompjs";

const API_URL = "http://i11a308.p.ssafy.io:8080/api";
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
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/chats/rooms`,
        // headers: {
        //   Authorization:
        //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLTQyMTItOGE5MC04MTE4NmM1N2YxMDAiLCJpc3MiOiJ3d3cuc2Ftc3VuZy5jb20iLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNzIzMDA3NDAwfQ.D856FncOnKSe1O_1vw0jyOHGMPfWionPRvMZ_QWPaPDnAmRHfM9U2VFOprdM3QP2JEQXz_Ewn4mJvPoVAg5NQA",
        // },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);

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
    console.log("메세지 보냄", client);
    if (content.trim() === "") return;

    const message = {
      nickname,
      imageUrl,
      content,
    };

    if (client) {
      console.log("pub");
      client.publish({
        destination: `/pub/${selectedRoom}`,
        body: JSON.stringify(message),
      });

      // addMessage(message); // Optional: Add the sent message to the chat (if desired)
      set({ content: "" });
    }
  },
}));
export default useChatStore;
