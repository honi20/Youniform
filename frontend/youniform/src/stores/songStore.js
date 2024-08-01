import { create } from "zustand";
import axios from "axios";

const useSongStore = create((set) => ({
  teamSongs: [
    { id: 0, title: "승리하라 몬스터즈여" },
    { id: 1, title: "몬스터즈 승리 영원하라" },
  ],

  playerSongs: [],

  fetchTeamSongs: async () => {
    try {
      const response = await axios.get("YOUR_TEAM_SONGS_API_ENDPOINT");
      set({ teamSongs: response.data });
    } catch (error) {
      console.error("Failed to fetch team songs:", error);
    }
  },

  fetchPlayerSongs: async () => {
    try {
      const response = await axios.get("YOUR_PLAYER_SONGS_API_ENDPOINT");
      set({ playerSongs: response.data });
    } catch (error) {
      console.error("Failed to fetch player songs:", error);
    }
  },
}));

export default useSongStore;
