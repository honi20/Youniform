import { create } from "zustand";
import useUserStore from "@stores/userStore";
import axios from "axios";
import { getApiClient } from "@stores/apiClient";

const usePhotoCardStore = create((set, get) => ({
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
  fetchPhotoCardList: async () => {
    // const { accessToken } = get();
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/photocards`);
      console.log(res);
      set({ photoCards: res.data.body });
      console.log(res.data.body);
    } catch (error) {
      console.log("Failed to fetchPhotocards", err);
    }
  },
  createPhotoCard: async (imageBlob) => {
    // const { accessToken } = get();
    const apiClient = getApiClient();
    try {
      const res = await apiClient.post(`/photocards`, {
        data: {
          imgUrl: imageBlob,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log("Failed to createPhotoCard", err);
    }
  },
  // 포토카드 다중 삭재
  deletePhotocards: async (list) => {
    // const { accessToken } = get();
    const apiClient = getApiClient();
    try {
      const res = await apiClient.delete(`/photocards`, {
        params: {
          photocardIdList: list,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log("Failed to createPhotoCard", err);
    }
  },
  // 포토카드 단일 삭제
  deletePhotocard: async (id) => {
    // const { accessToken } = get();
    const apiClient = getApiClient();
    try {
      const res = await apiClient.delete(`/photocards/${id}`, {
        params: {
          photocardId: id,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log("Failed to createPhotoCard", err);
    }
  },

  fetchPhotocardDetail: async () => {},
}));

export default usePhotoCardStore;
