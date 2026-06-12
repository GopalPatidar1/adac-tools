module.exports = {
  // Use Docusaurus's data-theme attribute for dark mode
  darkMode: ["class", "[data-theme=\"dark\"]"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./docs/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
  ],
  corePlugins: {
    preflight: false, // CRITICAL: prevents overriding Docusaurus base styles
  },
  theme: {
    extend: {
      colors: {
        // Add your custom Ignix UI colors here
      },
    },
  },
};
