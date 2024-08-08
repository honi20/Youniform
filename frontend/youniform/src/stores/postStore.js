import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";
import axios from "axios";
const API_URL = "http://i11a308.p.ssafy.io:8080";
const usePostStore = create((set) => ({
  posts: [],
  post: [],
  fetchPost: async (postId) => {
    console.log(postId);
    const apiClient = getApiClient();
    try {
      const res = await apiClient({
        method: "get",
        url: `${API_URL}/posts/${postId}`,
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
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/posts`);
      console.log(res.data.header.message);
      console.log(res.data.body);

      set({
        posts: res.data.body.postList.content,
      });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  addPost: async (post) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post(`/posts`, post, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body);

      set((state) => ({ posts: [...state.posts, response.data.body] }));
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
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
  myPosts: [],
  fetchMyPosts: async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/posts/list`,
      });
      console.log(res.data.header.message);
      console.log(res.data.body.postList.content);

      set({
        myPosts: res.data.body.postList.content,
      });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
}));

export default usePostStore;
