import { create } from "zustand";
import axios from "axios";

const API_URL = "http://i11a308.p.ssafy.io:8080";
const useUserStore = create((set) => ({
  user: null,
  friend: null,
  loading: false,
  error: null,
  accessToken: null,
  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${API_URL}/users`);
      console.log(response.data.header.message);
      console.log(response.data.body);
      set({ user: response.data.body, loading: false });
    } catch (error) {
      console.log("Failed to fetch user", error);
      set({ loading: false, error: error.message });
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
      set({ loading: false, error: error.message });
    }
  },
  clearFriend: () => set({ friend: null, error: null }),
  fetchLogin: async (email, password) => {
    console.log(email);
    console.log(password);
    const res = await axios({
      method: "post",
      url: `${API_URL}/users/signin/local`,
      data: {
        email: email,
        password: password
      }
    })
    .then((res) => {
      console.log(res.data.body.accessToken);
      set({ accessToken: res.data.body.accessToken });
      return "$OK";
    })
    .catch((err) => {
      console.log("Failed to fetchLogin", err);
      return "$FAIL";
    })
  },
}));

export default useUserStore;
