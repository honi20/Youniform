import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: {
          "nickname": "bebebe",
          "introduce": "기아 짱팬",
          "profileUrl": "S3 URL",
          "theme": "MONSTERS",
          "pushAlert": true,
          "teamImage": "team S3 URL"
        },
  loading: false,
  error: null,
  fetchUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`https://api.example.com/users/${userId}`);
      set({ user: response.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
  clearUser: () => set({ user: null, error: null })
}));

export default useUserStore;
