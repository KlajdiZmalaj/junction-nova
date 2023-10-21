/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          600: "var(--primary-600)",
          900: "var(--primary-900)",
        },
        secondary: {
          100: "var(--secondary-100)",
        },
        neutral: {
          700: "var(--neutral-700)",
          600: "var(--neutral-600)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
        },
        white: "#FFFFFF",
        success: {
          600: "var(--success-600)",
          700: "var(--success-700)",
        },
        error: {
          300: "var(--error-300)",
          500: "var(--error-500)",
        },
        warning: {
          500: "var(--warning-500)",
        },
      },
      fontSize: {
        // first value is the font size, second value is the line-height
        "heading-l": ["28px", "33.8px"],
        "heading-m": ["24px", "29.05px"],
        "heading-s": ["20px", "24.2px"],

        "body-l": ["18px", "28px"],
        "body-m": ["16px", "29.05px"],
        "body-s": ["14px", "20px"],
        "body-xs": ["12px", "16px"],

        "label-l": ["18px", "24px"],
        "label-m": ["16px", "20px"],
        "label-s": ["14px", "16px"],
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      spacing: {
        120: "7.375rem", // 120px
      },
      width: {
        sidebar: "240px",
        page: "calc(100% - theme('width.sidebar'))",
      },
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
};
