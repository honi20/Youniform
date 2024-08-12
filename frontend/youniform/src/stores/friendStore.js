import { create } from "zustand";
import axios from "axios";

const API_URL = "http://i11a308.p.ssafy.io:8080";
const useFriendStore = create((set) => ({
  friends: [],
  fetchFriends: async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/friends`,
        // headers: {
        //   Authorization: "Bearer your_token_here",
        // },
        // data: {

        // },
      });
      console.log(res.data.body.friendList);
      console.log(res.data.header.message);
      set({ friends: res.data.body.friendList });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  deleteFriend: async (friendId) => {
    try {
      console.log(`Attempting to delete friend with ID: ${friendId}`);
      const res = await axios({
        method: "delete",
        url: `${API_URL}/friends`,
        // headers: {
        //   Authorization: "Bearer your_token_here",
        // },
        params: {
          id: "dstfiposdjfsd0fsb3t466t54regfdb-dsbsdb4324543",
        },
      });
      console.log(res.data.header.message);

      set((state) => ({
        friends: state.friends.filter((friend) => friend.friendId !== friendId),
      }));
    } catch (err) {
      console.error(
        "Error deleting friend:",
        err.response ? err.response.data : err.message
      );
    }
  },
}));

export default useFriendStore;
