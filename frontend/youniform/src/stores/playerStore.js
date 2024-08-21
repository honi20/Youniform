import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const usePlayerStore = create((set, get) => ({
  playerList: [],
  loading: false,
  error: null,
  team: [],
  total: [],
  fetchTotalList: async () => {
    set({ loading: true, error: null })
    const { fetchTeamList, fetchPlayerList } = get()
    try {
      await fetchTeamList();
      await fetchPlayerList();
      const { team, playerList } = get();
      // console.log(team, playerList)
      set({ total: [team, ...playerList] })
    }
    catch (err) {
      console.error(err.response ? err.response.data : err.message);
      set({ loading: false, error: err.message });
    }
  },
  fetchTeamList: async () => {
    set({loading: true, error: null})
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/teams/favorite`);
      // console.log(res.data.header.message);
      // console.log(res.data.body);
      set({ team: res.data.body, loading: false });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      set({ loading: false, error: err.message });
    }
  },
  fetchPlayerList: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/players/favorite`);
      // console.log(res.data.header.message);
      // console.log(res.data.body);
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
      // console.log(res.data.header.message);
      // console.log(res.data.body);
      set({ teamSongs: res.data.body.teamSongList, loading: false  });
    } catch (error) {
      console.error("Failed to fetch team songs:", error);
      set({ loading: false, error: err.message });
    }
  },

  fetchPlayerSongs: async (playerId) => {
    set({ loading: true, error: null });
    // console.log(playerId)
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/players/song/${playerId}`);
      // console.log(res.data.header.message);
      // console.log(res.data.body.songList);
      set({ playerSongs: res.data.body.songList, loading: false  });
    } catch (error) {
      console.error("Failed to fetch team songs:", error);
      set({ loading: false, error: err.message });
    }
  },
  updatePlayerPushAlert: async (playerId, pushAlert) => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      await apiClient.patch(`/players/alert/${playerId}`, { pushAlert });
      // console.log(`Player ${playerId} pushAlert status updated to ${pushAlert}`);
      // fetchPlayerList to refresh the player list with updated pushAlert state
      set({ loading: false });
    } catch (error) {
      console.error("Failed to update player pushAlert status:", error);
      set({ loading: false, error: error.message });
    }
  },
}));

export default usePlayerStore;
