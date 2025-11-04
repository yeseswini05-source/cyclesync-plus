/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      colors: {
        roseBg: "rgb(255,240,244)",     // soft blush background
        roseMain: "#ff4f8b",            // hot pink core
        roseDeep: "#c2185b",            // deeper berry
        lilac: "#ffd9f9",
        cream: "#fff9f4",
        night: "#1f1633",
        peach: "#ffb4c7",
      },
      boxShadow: {
        card: "0 20px 32px -8px rgba(255, 0, 90, 0.18)",
        soft: "0 16px 40px rgba(0,0,0,0.07)",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Playfair Display"', "serif"],
        body: ['"Nunito Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        // optional: colors similar to the design
        banana: "#FFEFB5", // page bg
        broccoli: "#6C9A3C", // CTA
        broccoliDark: "#4F6F2B",
      },
    },
  },
  plugins: [],
};

