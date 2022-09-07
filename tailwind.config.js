/* eslint-env node */
module.exports = {
    content: ["./src/**/*{vue,js,ts,jsx,tsx}"],
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
};
