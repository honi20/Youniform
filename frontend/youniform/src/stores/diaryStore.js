import { create } from "zustand";
import axios from "axios";

const API_URL = "http://i11a308.p.ssafy.io:8080";
const useDiaryStore = create((set) => ({
  diaries: [],
  fetchDiaries: async () => {
    console.log(1);
    try {
      console.log(2);
      const response = await axios({
        method: "get",
        url: `${API_URL}/diaries/list`,
        params: {
          lastDiaryDate: "2024-07-01",
          sort: "diaryDate",
          Authorization: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLZ"
        }
      });
      console.log(response.data);
      set({ diaries: response.data.body });
    } catch (error) {
      console.error("Failed to fetch diaries", error.response?.status, error.message);
    } 
  },
  addDiary: async (diary) => {
    try {
      const response = await axios.post(`${API_URL}/diaries`, diary);
      set((state) => ({ diaries: [...state.diaries, response.data] }));
    } catch (error) {
      console.error("Failed to add diary", error);
    }
  },
  updateDiary: async (id, updatedDiary) => {
    try {
      const response = await axios.put(`${API_URL}/diaries/${id}`, updatedDiary);
      set((state) => ({
        diaries: state.diaries.map((diary) =>
          diary.id === id ? response.data : diary
        ),
      }));
    } catch (error) {
      console.error("Failed to update diary", error);
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
}));

export default useDiaryStore;
