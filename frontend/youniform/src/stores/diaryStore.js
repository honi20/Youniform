import { create } from "zustand";
import axios from "axios";
import useUserStore from "@stores/userStore";

const logFormData = (formData) => {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
};
const API_URL = "http://i11a308.p.ssafy.io:8080";
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
  fetchMonthlyDiaries: async (date) => {
    const res = await axios({
      method: "get",
      url: `${API_URL}/diaries/monthly`,
      // headers: {
      //   Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLZ",
      // },
      params: {
        calendarDate: "2024-07",
      },
    })
      .then((res) => {
        set({ monthlyDiaries: res.data.body.diaryList });
      })
      .catch((err) => {
        console.error("Failed to fetch monthlyDiaries", err);
      });
  },
  fetchFriendsDiaries: async (userId, date) => {
    const res = await axios({
      method: "get",
      url: `${API_URL}/diaries/monthly`,
      // headers: {
      //   Authorization: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLZ",
      // },
      params: {
        userId: userId,
        calendarDate: "2024-07",
      },
    })
      .then((res) => {
        set({ monthlyDiaries: res.data.body.diaryList });
      })
      .catch((err) => {
        console.error("Failed to fetch monthlyDiaries", err);
      });
  },
  fetchDiaries: async () => {
    const { accessToken } = useUserStore.getState();
    console.log(accessToken);
    await axios({
      method: "get",
      url: `${API_URL}/diaries`,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
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
  fetchDiary: async (diaryId) => {
    const { accessToken } = useUserStore.getState();
    console.log(accessToken);
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/diaries/${diaryId}`,
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);

      set({ diary: res.data.body });
      // return res.data.body;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  addDiary: async (formData) => {
    logFormData(formData);
    const { accessToken } = useUserStore.getState();
    console.log(accessToken);
    try {
      const res = await axios({
        method: "post",
        // url: `${API_URL}/diaries`,
        url: `${API_URL}/diaries`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
        // transformRequest: (formData) => formData,
      });
      console.log(res.data.header.message);
      console.log(res.data.body);

      // set((state) => ({
      //   diaries: [...state.diaries, diary],
      // }));
      return res.data.body.diaryId;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
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
