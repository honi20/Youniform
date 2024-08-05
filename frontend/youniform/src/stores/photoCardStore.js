import { create } from 'zustand';

const usePhotoCardStore = create((set) => ({
  isFlipped: false,
  flipPage: () => set((state) => ({ isFlipped: !state.isFlipped }))
}));

export default usePhotoCardStore;
