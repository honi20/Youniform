import { create } from "zustand";
import axios from "axios";
import { getApiClient } from "@stores/apiClient";

const logFormData = (formData) => {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
};

const useDiaryStore = create((set) => ({
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
  fetchFriendsDiaries: async (userId, date) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/diaries/monthly`, {
        params: {
          userId: userId,
          calendarDate: "2024-07",
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
      set({ diaries: res.data.body });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  fetchDiary: async (diaryId) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/diaries/${diaryId}`);
      console.log(res.data.header.message);
      console.log(res.data.body);

      set({ diary: res.data.body });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
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
  updateDiary: async (diaryId, updatedDiary) => {
    const apiClient = getApiClient();
    console.log("updateDiary - API Client:", apiClient);
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
  deleteDiary: async (id) => {
    try {
      await axios.delete(`${API_URL}/diaries/${id}`);
      set((state) => ({
        diaries: state.diaries.filter((diary) => diary.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete diary", error);
    }
  },
  initializeDiary: () => {
    set({ diary: [] });
  },
  mydiary: [],
  fetchMyDiary: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/diaries/list`, {
        params: {
          lastDiaryDate: "2024-08-09",
          sort: "diaryDate",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
}));

export default useDiaryStore;
