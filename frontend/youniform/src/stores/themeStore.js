import { create } from "zustand";

const themes = {
  basic: {
    primary: "",
    secondary: "",
    tertiary: "",
    calendar: "", // 파스텔톤
    background: "",
  },
  monsters: {
    primary: "#262F66",
    secondary: "#ACC0E2",
    tertiary: "#ECF3F8",
    calendar: "#A6C6FA",
    background: "#F8F8F8",
  },
  kia: {
    primary: "red",
  },
};

// 테마 스토어 생성
const useThemeStore = create((set) => ({
  theme: themes.monsters,

  setTheme: (themeName) => {
    if (themes[themeName]) {
      set({ theme: themes[themeName] });
    } else {
      console.error(`Theme ${themeName} does not exist.`);
    }
  },
}));

export default useThemeStore;
