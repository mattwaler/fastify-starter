module.exports = {
  darkMode: false,
  mode: 'jit',
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    debugScreens: {
      position: ['bottom', 'right'],
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-debug-screens'),
  ],
  purge: [
    './views/**/*.twig',
  ],
}
