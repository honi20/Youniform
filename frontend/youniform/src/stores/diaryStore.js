import { create } from "zustand";
import axios from "axios";

const API_URL = "http://i11a308.p.ssafy.io:8080";
const useDiaryStore = create((set) => ({
  diaries: [],
  fetchDiaries: async () => {
    try {
      const response = await axios.get(`${API_URL}/diaries`);
      set({ diaries: response.data.body });
    } catch (error) {
      console.error("Failed to fetch diaries", error);
    }
  },
  addDiary: async (diary) => {
    try {
      const response = await axios.post("/api/diaries", diary);
      set((state) => ({ diaries: [...state.diaries, response.data] }));
    } catch (error) {
      console.error("Failed to add diary", error);
    }
  },
  updateDiary: async (id, updatedDiary) => {
    try {
      const response = await axios.put(`/api/diaries/${id}`, updatedDiary);
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
      await axios.delete(`/api/diaries/${id}`);
      set((state) => ({
        diaries: state.diaries.filter((diary) => diary.id !== id),
      }));
    } catch (error) {
      console.error("Failed to delete diary", error);
    }
  },
}));

export default useDiaryStore;
