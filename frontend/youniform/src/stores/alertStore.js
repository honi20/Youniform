import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";
import { EventSourcePolyfill } from 'event-source-polyfill';

const API_URL = import.meta.env.VITE_API_URL;
const useAlertStore = create((set) => ({
  loading: false,
  error: null,
  alerts: [],
  currentAlert: null,

  subscribe: async () => {
    set({ loading: true, error: null });

    const lastEventId = localStorage.getItem('lastEventId') || '';
    const eventSource = new EventSourcePolyfill(`${API_URL}/alerts/subscribe`, {
      headers: {
        "Content-Type": "text/event-stream",
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Last-Event-ID': lastEventId,
      },
      heartbeatTimeout: 600000,
    });

    eventSource.addEventListener('sse-connect', (event) => {
      try {
        if (event.data.startsWith('{') || event.data.startsWith('[')) {
          const newNotification = JSON.parse(event.data);
          set((state) => ({
            alerts: [...state.alerts, newNotification],
            currentAlert: {...newNotification},
            loading: false,
          }));
          console.log(newNotification);
        } else {
          // JSON이 아닌 경우, 텍스트로 처리
          console.log("Received text data:", event.data);
        }
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        console.log("Received data:", event.data); // 데이터 확인을 위해 로깅
      }
    });

    eventSource.addEventListener('heartbeat', (event) => {
      console.log("Heartbeat received:", event.data);
      // 이 메시지는 타임아웃을 방지하기 위한 하트비트입니다.
    });

    // 오류 처리 및 재연결 로직
    eventSource.onerror = (error) => {
      console.log("Failed to subscribe to alerts", error);
      set({ error: "Failed to subscribe to alerts", loading: false });
      eventSource.close();
      // 재연결 로직 추가 가능
    };

    return () => {
      eventSource.close();
    };
  },

  // 모달 닫기
  clearCurrentAlert: () => set({ currentAlert: null }), 

  deleteAllAlerts: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const response = await apiClient.delete(`/alerts`);
      console.log("전체 알림 삭제에 성공했습니다.")
      console.log(response.data.body)
    } catch (error) {
      console.log("Failed to deleteAllAlerts", error);
    }
  },
  markAllAlertsAsRead: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const response = await apiClient.patch(`/alerts`);
      console.log("전체 알림 읽음 처리에 성공했습니다.")
      console.log(response.data.body)
    } catch (error) {
      console.log("Failed to markAllAlertsAsRead", error);
    }
  },
  fetchAlerts: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const response = await apiClient.get(`/alerts/list`);
      console.log("전체 알림 조회에 성공했습니다.");
      console.log(response.data.body);
      set({ alerts: response.data.body.alertList });
    } catch (error) {
      console.log("Failed to patchAlerts", error);
    }
  },
  deleteAlert: async (alertId) => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const response = await apiClient.delete(`/alerts/${alertId}`);
      console.log("알림 삭제에 성공했습니다.")
      console.log(response.data.body)
      return "$SUCCESS";
    } catch (error) {
      console.log("Failed to deleteAlert", error);
    }
  },
  markAlertAsRead: async (alertId) => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const response = await apiClient.patch(`/alerts/${alertId}`);
      console.log("알림 읽음 처리에 성공했습니다.")
      console.log(response.data.body)
    } catch (error) {
      console.log("Failed to markAlertAsRead", error);
    }
  },
}));

export default useAlertStore;