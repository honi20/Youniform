import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";

const usePlayerStore = create((set) => ({
  playerList: [],
  loading: false,
  error: null,
  fetchPlayerList: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/players/favorite`);
      console.log(res.data.header.message);
      console.log(res.data.body);
      set({ playerList: res.data.body.playerList, loading: false });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      set({ loading: false, error: err.message });
    }
  },
  teamSongs: [],
  playerSongs: [],

  fetchTeamSongs: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/teams/song`);
      console.log(res.data.header.message);
      console.log(res.data.body);
      set({ teamSongs: res.data.body.teamSongList, loading: false  });
    } catch (error) {
      console.error("Failed to fetch team songs:", error);
      set({ loading: false, error: err.message });
    }
  },

  fetchPlayerSongs: async (playerId) => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/players/song/${playerId}`);
      console.log(res.data.header.message);
      console.log(res.data.body.songList);
      set({ playerSongs: res.data.body.songList, loading: false  });
    } catch (error) {
      console.error("Failed to fetch team songs:", error);
      set({ loading: false, error: err.message });
    }
  },
}));

export default usePlayerStore;
