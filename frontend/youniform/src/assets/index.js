// src/assets/index.js
export const wallpapers = import.meta.glob('./wallpapers/*.{png,jpg,jpeg,svg}', { eager: true });
export const stickers = import.meta.glob('./stickers/*.{png,jpg,jpeg,svg}', { eager: true });
export const fonts = import.meta.glob('./fonts/*.{otf,ttf}', { eager: true });
