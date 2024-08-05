import { create } from "zustand";
import axios from "axios";

const API_URL = "http://i11a308.p.ssafy.io:8080";
const useUserStore = create((set) => ({
  user: null,
  friend: null,
  loading: false,
  error: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/users`);
      console.log(response.data);
      set({ user: response.data.body, loading: false });
    } catch (error) {
      console.log("Failed to fetch user", error);
    }
  },
  clearUser: () => set({ user: null, error: null }),
  fetchFriend: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/users/${userId}`);
      set({ friend: response.data.body, loading: false });
    } catch (error) {
      console.log("Failed to fetch friend", error);
    }
  },
  clearFriend: () => set({ friend: null, error: null }),
}));

export default useUserStore;
