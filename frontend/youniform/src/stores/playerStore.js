import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";

const usePlayerStore = create((set) => ({
  playerList: [],
  fetchPlayerList: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/players/favorite`);
      console.log(res.data.header.message);
      console.log(res.data.body);
      set({ playerList: res.data.body.playerList });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  },
  teamSongs: [],
  playerSongs: [],

  fetchTeamSongs: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/teams/song`);
      console.log(res.data.header.message);
      console.log(res.data.body);
      set({ teamSongs: res.data.body.teamSongList });
    } catch (error) {
      console.error("Failed to fetch team songs:", error);
    }
  },

  fetchPlayerSongs: async (playerId) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/players/song/${playerId}`);
      console.log(res.data.header.message);
      console.log(res.data.body.songList);
      set({ playerSongs: res.data.body.songList });
    } catch (error) {
      console.error("Failed to fetch team songs:", error);
    }
  },
}));

export default usePlayerStore;
