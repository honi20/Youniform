import { create } from 'zustand';
import useUserStore from '@stores/userStore';
import axios from 'axios';

const usePhotoCardStore = create((set) => ({
  photoCards: [],
  isFlipped: false,
  flipPage: () => set((state) => ({ isFlipped: !state.isFlipped })),
  page: 0,
  totalPages: 2,
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  setPage: (page) => set({ page }),
  selectedImage: null,
  setSelectedImage: (image) => set({ selectedImage: image }),
  fetchPhotoCardList: async (accessToken) => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/photocards`,
        params: {
          Authorization: accessToken
        }
      });
      console.log(res);
    } catch (error) {
      console.log("Failed to fetchPhotocards", err);
    }
  },
  createPhotoCard: async (accessToken, url) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/photocards`,
        params: {
          Authorization: accessToken
        },
        data: {
          imgUrl: url
        }
      });
      console.log(res);
    } catch (error) {
      console.log("Failed to fetchPhotocards", err);
    }
  }
}));

export default usePhotoCardStore;
