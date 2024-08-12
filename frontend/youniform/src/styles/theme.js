// theme.js

export const deviceSizes = {
  mobile: 375,
  // tablet: 768,
  // laptop: 1024,
};

export const device = {
  mobile: `screen and (max-width: ${deviceSizes.mobile}px)`,
  // tablet: `screen and (max-width: ${deviceSizes.tablet}px)`,
  // laptop: `screen and (max-width: ${deviceSizes.laptop}px)`,
};

export const themes = {
  basic: {
    primary: "",
    secondary: "",
    tertiary: "",
    calendar: "",
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
