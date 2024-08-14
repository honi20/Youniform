import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";

const usePostStore = create((set) => ({
  posts: [],
  post: null,
  comments: {},
  fetchPost: async (postId) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient({
        method: "get",
        url: `/posts/${postId}`,
      });
      console.log(res.data.header.message);
      console.log(res.data.body);

      set({
        post: res.data.body,
        comments: {
          [postId]: res.data.body.commentList || [], // 댓글 목록을 포스트 ID를 기준으로 저장
        },
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
      console.log(res.data.body.postList);

      set({
        posts: res.data.body.postList.content,
      });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  addPost: async (formData) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post(`/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body.postId);
      return res.data.body.postId;
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  updatePost: async (postId, formData) => {
    const apiClient = getApiClient();
    try {
      console.log(postId);
      const res = await apiClient.post(`/posts/${postId}`, formData, {
      headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data.header.message);
      console.log(res.data.body.postId);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  deletePost: async (postId) => {
    const apiClient = getApiClient();
    try {
      console.log(postId);
      const res = await apiClient.delete(`/posts/${postId}`);
      console.log(res.data.header.message);
      console.log(res.data.body.postId);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  likePosts: [],
  fetchLikePosts: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/posts/likes`);
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
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/posts/list`);
      console.log(res.data.header.message);
      console.log(res.data.body.postList.content);

      set({
        myPosts: res.data.body.postList.content,
      });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },

  addComment: async (postId, comment) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post(`/comments/${postId}`, {
        contents: comment,
      });
      console.log(res.data.header.message);
      console.log(res.data.body);

      const newComment = res.data.body;

      set((state) => ({
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), newComment], // 댓글을 해당 포스트에 추가
        },
      }));
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  updateComment: async (commentId, updatedComment) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.patch(`/comments/${commentId}`, {
        contents: updatedComment,
      });
      console.log(res.data.header.message);
      console.log(res.data.body);

      const newComment = res.data.body;

      set((state) => {
        const postId = newComment.postId;
        return {
          comments: {
            ...state.comments,
            [postId]:
              state.comments[postId]?.map((comment) =>
                comment.id === commentId ? newComment : comment
              ) || [],
          },
        };
      });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  deleteComment: async (commentId, postId) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.delete(`/comments/${commentId}`);
      console.log(res.data.header.message);
      console.log(res.data.body);
      set((state) => {
        const postComments = state.comments[postId] || [];
        console.log(postComments);
        return {
          comments: {
            ...state.comments,
            [postId]: postComments.filter(
              (comment) => comment.id !== commentId
            ), // 댓글 삭제
          },
        };
      });
    } catch (error) {
      console.error(
        "Failed to delete comment:",
        error.response ? error.response.data : error.message
      );
    }
  },
  friendPosts: [],
  fetchFriendPosts: async (userId) => {
    const apiClient = getApiClient();
    try {
      const response = await apiClient.get(`/posts/friends/${userId}`);
      console.log(response.data.header);
      console.log(response.data.body);
      set({ friendPosts: response.data.body.postList.content, loading: false });
    } catch (error) {
      console.log("Failed to fetch friend", error);
      set({ loading: false, error: error.message });
    }
  },
}));

export default usePostStore;
