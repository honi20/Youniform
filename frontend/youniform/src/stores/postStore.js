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
        //   Authorization:
        //     "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxNjA0Yjc3Mi1hZGMwLTQyMTItOGE5MC04MTE4NmM1N2YxMDAiLCJpc3MiOiJ3d3cuc2Ftc3VuZy5jb20iLCJ0eXBlIjoiYWNjZXNzX3Rva2VuIiwiZXhwIjoxNzIzMDA3NDAwfQ.D856FncOnKSe1O_1vw0jyOHGMPfWionPRvMZ_QWPaPDnAmRHfM9U2VFOprdM3QP2JEQXz_Ewn4mJvPoVAg5NQA",
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
