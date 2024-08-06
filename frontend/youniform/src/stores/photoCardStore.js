import { create } from 'zustand';

const usePhotoCardStore = create((set) => ({
  isFlipped: false,
  flipPage: () => set((state) => ({ isFlipped: !state.isFlipped })),
  page: 0,
  totalPages: 2,
  nextPage: () => set((state) => ({ page: state.page + 1 })),
  prevPage: () => set((state) => ({ page: state.page - 1 })),
  setPage: (page) => set({ page }),
  selectedImage: null,
  setSelectedImage: (image) => set({ selectedImage: image }),
}));

export default usePhotoCardStore;
