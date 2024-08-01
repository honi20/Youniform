import { create } from "zustand";
import axios from "axios";
import { useCallback } from "react";

const useChatStore = create((set) => ({
  user: null, // 로그인된 사용자
  chatRoomId: null, // 현재 채팅방 id
  chatRooms: [], // 사용자의 채팅방 목록
  messages: [], // 채팅 메시지 목록
  inputMessage: "", // 메세지 입력값
  wsConnected: false, // 웹소켓 연결 상태
  wsError: null, // 웹소켓 오류
  ws: null, // 웹소켓 인스턴스
  // 사용자 정보 설정
  setUser: (user) => set({ user }),

  // 채팅방 설정
  setChatRoomId: (id) => set({ chatRoomId: id }),
  setChatRooms: (rooms) => set({ chatRooms: rooms }),

  // 메시지 관리
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setInputMessage: (message) => set({ inputMessage: message }),
  clearMessages: () => set({ messages: [] }),

  // 웹소켓 상태 관리
  setWsConnected: (status) => set({ wsConnected: status }),
  setWsError: (error) => set({ wsError: error }),

  // 웹소켓 연결 및 이벤트 핸들러 설정
  connectWebSocket: (url) => {
    const ws = new WebSocket(url);
    set({ ws });

    ws.onopen = () => set({ wsConnected: true });
    ws.onclose = () => set({ wsConnected: false });
    ws.onerror = (error) => {
      console.log("Websocket error:", error);
      set({ wsError: error });
    };
    // ws.onmessage = (event) => {
    //   try {
    //     const message = isBinary ? data : data.toString();
    //     set((state) => ({
    //       messages: [...state.messages, message],
    //     }));
    //   } catch (error) {
    //     console.error("Error parsing message:", error);
    //   }
    // };

    return ws;
  },
  sendMessage: (message) => {
    set((state) => {
      const ws = state.ws;
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message)); // 메시지를 JSON으로 변환하여 전송
      }
    });
  },
}));
export default useChatStore;
