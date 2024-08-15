import { create } from "zustand";
import axios from "axios";
import { getApiClient } from "@stores/apiClient";

const logFormData = (formData) => {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
};

const useDiaryStore = create((set) => ({
  selectedUser: null,
  setSelectedUser: (id) => set({ selectedUser: id }),
  loading: false,
  error: null,
  diaries: [],
  diary: [],
  monthlyDiaries: [],
  getCurrentData: () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  },
  // 다이어리 생성
  addDiary: async (formData) => {
    // logFormData(formData);
    const apiClient = getApiClient();
    console.log("API Client:", apiClient);
    try {
      const res = await apiClient.post("/diaries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
      return res.data.body.diaryId;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  // 월간 마이리스트 조회
  fetchMonthlyDiaries: async (formattedDate) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/diaries/monthly`, {
        params: {
          calendarDate: formattedDate,
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
      set({ monthlyDiaries: res.data.body.diaryList });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },

  fetchFriendsDiaries: async (id, formattedDate) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/diaries/monthly/${id}`, {
        params: {
          calendarDate: formattedDate,
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
      set({ monthlyDiaries: res.data.body.diaryList });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  fetchDiaries: async () => {
    set({ loading: true });
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/diaries`, {
        data: {
          // diaryDate: getCurrentDate(),
          contents: diary,
          scope: "ALL",
          stampId: 1,
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
      set({ diaries: res.data.body, loading: false });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  // 다이어리 상세조회
  fetchDiary: async (diaryId) => {
    console.log(`diaryId: ${diaryId}`);
    set({ loading: true });
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/diaries/${diaryId}`);
      console.log(res.data.header.message);
      console.log(res.data.body);

      set({ diary: res.data.body, loading: false });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      set({ error: err.message, loading: false });
    }
  },
  addDiary: async (formData) => {
    const apiClient = getApiClient();
    console.log("API Client:", apiClient);
    try {
      const res = await apiClient.post("/diaries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
      return res.data.body.diaryId;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  updateDiary: async (diaryId, updatedDiary) => {
    const apiClient = getApiClient();
    // console.log("updateDiary - API Client:", apiClient);
    try {
      const res = await apiClient.post(`/diaries/${diaryId}`, updatedDiary, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
      set((state) => ({
        diaries: state.diaries.map((diary) =>
          diary.id === id ? response.data : diary
        ),
      }));
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  deleteDiary: async (diaryId) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.delete(`/diaries/${diaryId}`);
      console.log(res.data.header.message);
      console.log(res.data.body);
      set((state) => ({
        diaries: state.diaries.filter((diary) => diary.id !== diaryId),
      }));
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  initializeDiary: () => {
    set({ diary: [] });
  },
  myDiary: [],
  fetchMyDiary: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/diaries/list`, {
        params: {
          lastDiaryDate: "2024-08-01",
          sort: "diaryDate",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body.diaryList.content);
      set({ myDiary: res.data.body.diaryList.content });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  friendDiary: [],
  fetchFriendDiary: async (userId) => {
    const apiClient = getApiClient();
    try {
      const response = await apiClient.get(`/diaries/list/${userId}`);
      console.log(response.data.header.message);
      console.log(response.data.body.diaryList.content);
      set({ friendDiary: response.data.body.diaryList.content });
    } catch (error) {
      console.log("Failed to fetch friend", error);
      set({ loading: false, error: error.message });
    }
  },
}));

export default useDiaryStore;
