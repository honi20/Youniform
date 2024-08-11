import { create } from "zustand";
import axios from "axios";
import { getApiClient } from "@stores/apiClient";

const handleApiError = (err) => {
  console.error(err.response ? err.response.data : err.message);
};

const useFriendStore = create((set) => ({
  friends: [],
  diaryFriends: [],
  fetchFriends: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/friends/mypage`)
      const { body, header } = res.data;

      console.log(body);
      console.log(header.message);

      set({ friends: body.friendMypageList });
    } catch (err) {
      handleApiError(err)
    }
  },
  addFriend : async (friend) => {
    const apiClient = getApiClient();
    try {
      console.log(friend.userId);

      const res = await apiClient.post(`/friends/request`, {
        friendUuid: friend.userId,
      });

      console.log(res.data.message);
    } catch (err) {
      console.log("Failed to Add friend");
      handleApiError(err);
      set({ loading: false, error: err.message });
    }
  },
  deleteFriend: async (friendId) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.delete(`/friends`,{
        params: {
          id: friendId,
        },
      });
      console.log(res.data.header.message);

      set((state) => ({
        friends: state.friends.filter((friend) => friend.friendId !== friendId),
      }));
    } catch (err) {
      console.error("Error deleting friend:");
      handleApiError(err);
    }
  },
  fetchDiaryFriends: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/friends/diary`);
      console.log(res.data);
      set({ diaryFriends: res.data.body.friendDiaryList });
    } catch (error) {
      console.log("Failed to fetchDiaryFriends", error);
    }
  },
  acceptFriendRequest: async (uuid) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post(`/friends/accept`, {
        friendUuid: uuid
      });
      console.log(res.data);
      return "$SUCCESS"
    } catch (error) {
      console.log("Failed to fetchDiaryFriends", error);
    }
  },
}));

export default useFriendStore;
