window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        forest: {
          50: "#eef8f1",
          100: "#d7efdf",
          300: "#8bc99e",
          500: "#32995b",
          600: "#247947",
          800: "#153f2b",
          950: "#071f16",
        },
        soil: {
          50: "#f7f2ea",
          100: "#eadfcd",
          300: "#c8a977",
          600: "#8a6132",
        },
        mint: "#dff7ea",
        ink: "#12201a",
        ocean: "#1f6f8b",
        sun: "#f7b733",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "ui-sans-serif", "system-ui"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      boxShadow: {
        soft: "0 20px 45px rgba(18, 32, 26, 0.10)",
        lift: "0 14px 28px rgba(36, 121, 71, 0.16)",
      },
      animation: {
        float: "float 5s ease-in-out infinite",
        reveal: "reveal .65s ease both",
        pulseSoft: "pulseSoft 2.6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        reveal: {
          "0%": { opacity: 0, transform: "translateY(18px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseSoft: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(50, 153, 91, .24)" },
          "50%": { boxShadow: "0 0 0 12px rgba(50, 153, 91, 0)" },
        },
      },
    },
  },
};
