import { create } from "zustand";
import * as Stomp from "@stomp/stompjs";
import { getApiClient } from "@stores/apiClient";

const useChatStore = create((set, get) => ({
  messages: [],
  content: "",
  isChatListVisible: false,
  chatRooms: [], // 전체 룸. axios 이용해서 fetch 필요함
  selectedRoom: null,
  client: null, // WebSocket 클라이언트

  //경덕
  // 하트비트 타이머 ID
  heartbeatInterval: null,
  // 현재 접속자 수
  connectedUsers: 0,
  //

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
      brokerURL: "wss://youniform.site/api/stomp/chat",
      connectHeaders: {
        Authorization: `Bearer ${window.localStorage.getItem("accessToken")}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
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

        //경덕
        // 접속자 수 경로 구독
        newClient.subscribe(`/sub/${selectedRoom}/userCount`, (message) => {
          const userCount = parseInt(message.body, 10);
          console.log("접속자 수 업데이트:", userCount);
          set({ connectedUsers: userCount });
        });

        // 하트비트 전송 설정 (1초마다 하트비트 전송)
        const heartbeatInterval = setInterval(() => {
          if (newClient.connected) {
            newClient.publish({
              destination: `/pub/heartbeat`,
              body: JSON.stringify({ type: "HEARTBEAT" }),
            });
            console.log("하트비트 전송");
          }
        }, 1000);

        set({ heartbeatInterval });
      },
      //

      onStompError: (frame) => {
        console.error("STOMP 오류", frame);
      },
    });
    newClient.activate();
    set({ client: newClient });
  },
  disconnect: () => {
    // 경덕,
    //const { clien } = get();
    // 아래코드로 대체했음.

    const { client, heartbeatInterval } = get();
    if (client) {
      client.deactivate();

      //경덕,
      clearInterval(heartbeatInterval); // 하트비트 타이머 중지
      set({ client: null, heartbeatInterval: null });
      //

      // 위 코드로 대체했음.
      //set({ client: null });
    }
  },

  fetchChatRoom: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/chats/rooms`);
      console.log(res.data.header.message);
      console.log(res.data.body);
      // console.log(res.data.body.chatRoomList);

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
