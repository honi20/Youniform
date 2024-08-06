import { create } from "zustand";
import axios from "axios";

const API_URL = "http://i11a308.p.ssafy.io:8080";
const useDiaryStore = create((set) => ({
  diaries: [],
  diary: [],
  fetchDiaries: async () => {
    await axios({
      method: "get",
      url: `${API_URL}/diaries`,
      data: {
        // diaryDate: getCurrentDate(),
        contents: diary,
        scope: "ALL",
        stampId: 1,
      },
    })
      .then((res) => {
        set({ diaries: res.data.body });
      })
      .catch((err) => {
        console("Failed to fetch diaries", err);
      });
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
      const response = await axios.put(
        `${API_URL}/diaries/${id}`,
        updatedDiary
      );
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
