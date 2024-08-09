import { create } from "zustand";
import useUserStore from "@stores/userStore";
import axios from "axios";
import { getApiClient } from "@stores/apiClient";
const logFormData = (formData) => {
  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }
};
const usePhotoCardStore = create((set, get) => ({
  photoCards: [],
  isFlipped: false,
  flipPage: () => set((state) => ({ isFlipped: !state.isFlipped })),
  page: 0,
  totalPages: 0,
  setTotalPages: (num) => set((state) => ({ totalPages: num })),
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  setPage: (page) => set({ page }),
  selectedImage: null,
  setSelectedImage: (image) => set({ selectedImage: image }),
  fetchPhotoCardList: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/photocards`);
      console.log(res);
      set({ photoCards: res.data.body.photocardList });
      // console.log(photoCards);
    } catch (error) {
      console.log("Failed to fetchPhotocards", error);
    }
  },
  createPhotoCard: async (formData) => {
    const apiClient = getApiClient();
    logFormData(formData);
    try {
      const res = await apiClient.post(`/photocards`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log("Failed to createPhotoCard", error);
    }
  },
  // 포토카드 다중 삭재
  deletePhotocards: async (list) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.delete(`/photocards`, {
        params: {
          photocardIdList: list,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log("Failed to createPhotoCard", error);
    }
  },
  // 포토카드 단일 삭제
  deletePhotocard: async (id) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.delete(`/photocards/${id}`, {
        params: {
          photocardId: id,
        },
      });
      console.log(res.data);
    } catch (error) {
      console.log("Failed to createPhotoCard", error);
    }
  },

  fetchPhotocardDetail: async () => {},
}));

export default usePhotoCardStore;
