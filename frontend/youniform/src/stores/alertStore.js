import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";

const useAlertStore = create((set) => ({
  loading: false,
  error: null,
  alerts: [],
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