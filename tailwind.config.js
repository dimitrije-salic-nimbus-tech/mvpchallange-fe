const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        widthBigBox: '125.6rem',
        widthMediumBox: '79rem',
        widthSmallBox: '35.7rem',
        widthButtonBox: '45%',
        widthInput: '21rem',
        widthWizardButton: '13.4rem',
      },
      height: {
        heightBox: '27rem',
        inputHeight: 'var(--input-height)',
        heightWizardButton: '5.2rem',
      },
      textColor: {
        error: 'var(--input-error-color)',
        colorSecondary: 'var(--text-secondary-color)',
      },
      fontSize: {
        dropdownLabel: '1.8rem',
        inputError: '1.2rem',
        h1: '2.4rem',
        h2: '1.8rem',
        h3: '1.4rem',
      },
      colors: {
        greenText: '#9bfdca',
      },
      padding: {
        medium: '1.5rem',
        large: '3rem',
      },
      margin: {
        medium: '1.5rem',
        large: '3rem',
      },
      borderRadius: {
        medium: 'var(--border-radius-medium)',
        large: 'var(--border-radius-large)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme('fontSize.h1') },
        h2: { fontSize: theme('fontSize.h2') },
        h3: { fontSize: theme('fontSize.h3') },
      });
    }),
  ],
};
