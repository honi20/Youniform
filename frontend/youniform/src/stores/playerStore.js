import { create } from "zustand";
import apiClient from "./apiClient";
import useUserStore from "./userStore";

const usePlayerStore = create((set) => ({
    playerList: [],
    fetchPlayerList: () => {
    }
}))