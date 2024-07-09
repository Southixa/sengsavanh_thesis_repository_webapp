// tailwind.config.js
module.exports = {
    theme: {
      extend: {},
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          '.h-calc': {
            height: 'calc(100vh - 200px)',
          },
        }
  
        addUtilities(newUtilities)
      },
    ],
  }
  