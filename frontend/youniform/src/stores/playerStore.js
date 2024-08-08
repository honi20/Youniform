import { create } from "zustand";
import apiClient from "./apiClient";

const usePlayerStore = create((set) => ({
    playerList: [],
    fetchPlayerList: () => {
        
    }
}))