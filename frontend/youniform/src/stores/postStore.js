import { create } from "zustand";
import axios from "axios";

const API_URL = "http://i11a308.p.ssafy.io:8080";
const usePostStore = create((set) => ({
  posts: [],
  fetchPosts: async () => {
    try {
      const response = await axios.get(`${API_URL}/posts`);
      set({ posts: response.data.body.postList.content });
    } catch (error) {
      console.log("Failed to fetch posts", error);
    }
  },
  addPost: async (post) => {
    try {
      const response = await axios.post(`${API_URL}/posts`, post);
      set((state) => ({ posts: [...state.posts, response.data.body] }));
    } catch (error) {
      console.log("Failed to add post", error);
    }
  },
}));

export default usePostStore;
