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
  photoCard: null,
  photoCards: [],
  isFlipped: false,
  flipPage: () => set((state) => ({ isFlipped: !state.isFlipped })),
  page: 0,
  totalPages: 0,
  setPhotoCard: (photoCard) => set({ photoCard }),
  setTotalPages: () => {
    const totalPages = Math.ceil(get().photoCards.length / 4);
    console.log(`totalPages: ${totalPages}`);
    set({ totalPages });
  },
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  setPage: (page) => set({ page }),
  selectedImage: null,
  setSelectedImage: () => set({ selectedImage: 2 }),
  fetchPhotoCardList: async () => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/photocards`);
      console.log(res);
      set({ photoCards: res.data.body.photocardList });
      get().setTotalPages();
      console.log("fetch photocard");
      console.log(get().photoCards);
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
      console.log(res.data.header.message);
      console.log(res.data);
    } catch (error) {
      console.log("Failed to createPhotoCard", error);
    }
  },
  // 포토카드 삭제
  deletePhotocards: async (list) => {
    console.log("deletePhotocards function called with", list);
    const apiClient = getApiClient();
    try {
      const res = await apiClient.delete(`/photocards`, {
        params: {
          photocardIdList: list,
        },
      });
      console.log(res);
      console.log(res.data.header);
    } catch (error) {
      console.log("Failed to createPhotoCard", error);
    }
  },
  // 포토카드 단일 삭제
  // deletePhotocard: async (id) => {
  //   const apiClient = getApiClient();
  //   console.log(`id: ${id}`);
  //   try {
  //     const res = await apiClient.delete(`/photocards/${id}`, {
  //       params: {
  //         photocardId: id,
  //       },
  //     });
  //     console.log(res.data.header.message);
  //     console.log(res.data);
  //   } catch (error) {
  //     console.log("Failed to createPhotoCard", error);
  //   }
  // },
  fetchPhotocardDetail: async (id) => {
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`photocards/${id}`, {
        params: {
          photocardId: id,
        },
      });
      set({ photoCard: res.data.body });
      console.log(get().photoCard);
    } catch (error) {
      console.log("Failed to fetchPhotocardDetail", error);
    }
  },
}));

export default usePhotoCardStore;
