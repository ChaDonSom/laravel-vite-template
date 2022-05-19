module.exports = {
  content: [
    "./resources/ts/**/*{vue,js,ts,jsx,tsx}",
    "./resources/views/App.vue",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        '2xs': '1px',
        '3xs': '0.5px'
      }
    },
  },
  plugins: [],
}
