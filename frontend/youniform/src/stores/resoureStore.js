import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";

const useResourceStore = create((set) => ({
  loading: null,
  error: null,
  stampList: [],
  backgrounds: {},
  stickers: {},
  themes: {},

  setResources: (resourceList) => {
    const resources = {
      backgrounds: {},
      stickers: {},
      themes: {},
    };

    resourceList.forEach((resource) => {
      const { type, categories } = resource;

      categories.forEach((category) => {
        const { category: categoryName, items } = category;

        if (type === "BACKGOUND") {
          resources.backgrounds[categoryName] = items;
        } else if (type === "STICKER") {
          resources.stickers[categoryName] = items;
        } else if (type === "THEME") {
          resources.themes[categoryName] = items;
        }
      });
    });

    set((state) => ({
      ...state,
      ...resources,
    }));
  },

  fetchResources: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get("/diaries/resources");
      console.log(res.data.header);
      console.log(res.data.body);
      const resourceList = res.data.body.resourceList;

      set((state) => ({
        ...state,
        ...state.setResources(resourceList),
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    }
  },

  fetchStampList: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get(`/diaries/stamps`);
      console.log(res.data.header.message);
      console.log(res.data.body);
      set({ stampList: res.data.body.stampList, loading: false });
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      set({ loading: false, error: err.message });
    }
  },
}));

export default useResourceStore;
