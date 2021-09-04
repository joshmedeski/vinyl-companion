const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["./**/*.tsx"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: colors.rose,
        discogs: {
          DEFAULT: "#333333",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
