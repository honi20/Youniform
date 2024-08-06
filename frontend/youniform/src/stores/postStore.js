import { create } from "zustand";
import axios from "axios";

const API_URL = "http://i11a308.p.ssafy.io:8080";
const usePostStore = create((set) => ({
  posts: [],
  post: [],
  fetchPost: async (postId) => {
    console.log(postId);
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/posts/${postId}`,
        // headers: {
        //   Authorization: "Bearer your_token_here",
        // },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);

      set({
        post: res.data.body,
      });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  fetchPosts: async () => {
    // 수정해야함
    try {
      const response = await axios.get(`${API_URL}/posts`);
      set({ posts: response.data.body.postList.content });
    } catch (error) {
      console.log("Failed to fetch posts", error);
    }
  },
  addPost: async (post) => {
    // 수정해야함
    try {
      const response = await axios.post(`${API_URL}/posts`, post);
      set((state) => ({ posts: [...state.posts, response.data.body] }));
    } catch (error) {
      console.log("Failed to add post", error);
    }
  },
  likePosts: [],
  fetchLikePosts: async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/posts/likes`,
        // headers: {
        //   Authorization: "Bearer your_token_here",
        // },
      });
      console.log(res.data.header.message);
      console.log(res.data.body.postList.content);

      set({
        likePosts: res.data.body.postList.content,
      });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
}));

export default usePostStore;
