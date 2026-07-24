/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          bg: "var(--color-bg)",
          bg2: "var(--color-bg2)",
          text: "var(--color-text)",
          muted: "var(--color-muted)",
        },
        district: {
          primary: "var(--color-primary)",
          accent: "var(--color-accent)",
          gold: "var(--color-gold)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        accent: ["var(--font-accent)", "cursive"],
      },
      backgroundImage: {
        "arch-grad": "linear-gradient(180deg, var(--color-primary) 0%, var(--color-bg) 100%)",
      },
      clipPath: {
        arch: "path('M0,100 L0,30 Q0,0 30,0 L70,0 Q100,0 100,30 L100,100 Z')",
      },
    },
  },
  plugins: [],
}
