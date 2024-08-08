import { create } from "zustand";
import apiClient from "./apiClient";

const useUserStore = create((set, get) => ({
  user: null,
  friend: null,
  loading: false,
  error: null,
  accessToken:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLTQyMTItOGE5MC04MTE4NmM1N2Y1OTgiLCJpc3MiOiJ3d3cuc2Ftc3VuZy5jb20iLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNzIzMDk5OTEwfQ.m-My4huKrm0EE-J2riaB6pSU8adRYp4MchfyHLSx1q3SEUEMDLsimSs__LDIfH3oXQb8OIRzeWgqVkNJNrUgKg",
  refreshToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  clearAccessToken: () => set({ accessToken: null }),
  fetchUser: async () => {
    set({ loading: true, error: null });
    const { accessToken } = get();
    if (!accessToken) {
      console.error("No access token found");
      return;
    }
    try {
      const response = await apiClient.get("/users");
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
      const response = await apiClient.get(`/users/${userId}`);
      set({ friend: response.data.body, loading: false });
    } catch (error) {
      console.log("Failed to fetch friend", error);
      set({ loading: false, error: error.message });
    }
  },
  clearFriend: () => set({ friend: null, error: null }),
  fetchLogin: async (email, password) => {
    try {
      const response = await apiClient.post("/users/signin/local", {
        email,
        password,
      });
      console.log(response.data.body);
      const { accessToken } = response.data.body;
      set({ accessToken });
      return "$OK";
    } catch (err) {
      console.log("Failed to fetchLogin", err);
      return "$FAIL";
    }
  },
}));

export default useUserStore;
