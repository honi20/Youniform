import { create } from "zustand";
import { getApiClient } from "@stores/apiClient";

const useResourceStore = create((set, get) => ({
  loading: null,
  error: null,
  stampList: [],
  backgrounds: {},
  stickers: {},
  themes: {},
  templates: {},
  selectedColor: "WHITE",
  setSelectedColor: (category) => set({ selectedColor: category }),
  selectedCategory: "BASEBALL",
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setResources: (resourceList) => {
    const resources = {
      backgrounds: {},
      stickers: {},
      themes: {},
      templates: {},
    };

    resourceList.forEach((resource) => {
      const { type, categories } = resource;

      categories.forEach((category) => {
        const { category: categoryName, items } = category;

        if (type === "BACKGROUND") {
          resources.backgrounds[categoryName] = items;
        } else if (type === "STICKER") {
          resources.stickers[categoryName] = items;
        } else if (type === "THEME") {
          resources.themes[categoryName] = items;
        } else if (type === "TEMPLATE") {
          resources.template[categoryName] = items;
        }
      });
    });

    set((state) => ({
      ...state,
      ...resources,
    }));
    return resources;
  },

  fetchResources: async () => {
    set({ loading: true, error: null });
    const apiClient = getApiClient();
    try {
      const res = await apiClient.get("/diaries/resources");
      console.log(res.data.header);
      console.log(res.data.body);
      const resourceList = res.data.body.resourceList;
      const resources = get().setResources(resourceList);
      set((state) => ({
        ...state,
        ...resources, // Spread the resources object directly into state
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to fetch resources:", error);
      set({ loading: false, error: error.message });
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
