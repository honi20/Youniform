// src/assets/index.js
export const wallpapers = import.meta.glob(
  "./wallpapers/*.{png,jpg,jpeg,svg}",
  { eager: true }
);
export const stickers = import.meta.glob("./stickers/*.{png,jpg,jpeg,svg}", {
  eager: true,
});
export const fonts = import.meta.glob("./fonts/*.{otf,ttf}", { eager: true });
export const carouselTest = import.meta.glob("./carousel/*.{jpg,}", {
  eager: true,
});
export const frames = import.meta.glob(
  "./frames/*.{png,jpg,jpeg,svg}",
  { eager: true }
);