import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const useUserStore = create((set, get) => ({
  user: null,
  friend: null,
  loading: false,
  error: null,
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),

  fetchUser: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    // console.log("API Client:", apiClient);
    try {
      const response = await apiClient.get(`/users`);
      // console.log(response.data.header.message);
      // console.log(response.data.body);
      set({ user: response.data.body, loading: false });
    } catch (error) {
      console.log("Failed to fetch user", error);
      set({ loading: false, error: error.message });
    }
  },
  clearUser: () => set({ user: null, error: null }),

  fetchFriend: async (userId) => {
    set({ loading: true, error: null });
    // const { accessToken } = get();
    const apiClient = getApiClient();
    console.log("API Client:", apiClient);
    try {
      const response = await apiClient.get(`/users/${userId}`);
      console.log("유저 정보 조회에 성공했습니다.");
      console.log(response.data.body);
      set({ friend: response.data.body, loading: false });
    } catch (error) {
      console.log("Failed to fetch friend", error);
      set({ loading: false, error: error.message });
    }
  },
  clearFriend: () => set({ friend: null, error: null }),

  fetchLogin: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/signin/local`, {
        email,
        password,
      });
      console.log(response.data);
      const { accessToken } = response.data.body;
      set({ accessToken });
      const handleLoginSuccess = (accessToken) => {
        localStorage.setItem("accessToken", accessToken);
      };
      handleLoginSuccess(accessToken);
      return "$OK";
    } catch (err) {
      console.log("Failed to fetchLogin", err);
      return "$FAIL";
    }
  },

  findPassword: async (uuid, verifyCode, pw, confirmPw) => {
    try {
      const response = await axios.patch(`${API_URL}/users/password/reset`, {
        uuid: uuid,
        verify: verifyCode,
        password: pw,
        confirmPassword: confirmPw
      });
      console.log(response.data.header.message);
      console.log(response);
      if (response.data.header.httpStatusCode === 200) {
        return "$OK";
      } 
    } catch (err) {
      console.log("Failed to fetchLogin", err);
      return "$FAIL";
    }
  },

  resetPassword: async () => {

  }
}));

export default useUserStore;
