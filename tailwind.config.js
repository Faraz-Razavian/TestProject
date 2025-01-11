/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xs': '400px',
        'sm': '576px',
        'md': '769px',
        'lg': '900px',
        'xl': '1200px',
        '2xl': '1440px',
      },
      colors: {
        customBlack: '#383838',
        deActiveColor: '#cccccc',
        mainBgColor: '#ffffff',
        danger: '#ff0000',
        warning: '#ff8800',
        success: '#4cb050',
        primaryColor: "var(--primaryColor)",
        secondaryColor: "var(--secondaryColor)",
      },
      fontFamily: {
        vazirmatn: ["Vazirmatn", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      spacing: {
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
        '1/6': '16.666667%',
        '2/6': '33.333333%',
        '3/6': '50%',
        '4/6': '66.666667%',
        '5/6': '83.333333%',
        '1/12': '8.333333%',
        '2/12': '16.666667%',
        '3/12': '25%',
        '4/12': '33.333333%',
        '5/12': '41.666667%',
        '6/12': '50%',
        '7/12': '58.333333%',
        '8/12': '66.666667%',
        '9/12': '75%',
        '10/12': '83.333333%',
        '11/12': '91.666667%',
        '100': '100%',
        '130p': '130%',
        '150p': '150%',
        '72': '18rem',
        '80': '20rem',

      },
      borderRadius: {
        'xl': '1rem'
      },
      minWidth: (theme) => ({
        none: 'none',
        ...theme('spacing'),
      }),
      maxWidth: {
        'screen-sm': '97%',
        'screen-md': '730px',
        'screen-lg': '870px',
        'screen-xl': '1180px',
        'screen-2xl': '1420px',
      },
      minHeight: (theme) => ({
        none: 'none',
        ...theme('spacing'),
      }),
      maxHeight: (theme) => ({
        none: 'none',
        ...theme('spacing'),
      }),
      transitionProperty: {
        'height': 'height',
        'max-height': 'max-height',
      },
      fontSize: {
        '2xl': '2.5rem',
        'xl': '2rem',
        'lg': '1.7rem',
        'md': '1.3rem',
        '18': '18px',
        '17': '17px',
        '16': '16px',
        '15': '15px',
        '14': '14px',
        '13': '13px',
        '12': '12px',
      },
      flex: {
        'base': '0 0 auto'
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '999': '999',
        '9999': '9999',
        '99999': '99999',
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['first', 'last', 'hover', 'focus'],
      opacity: ['disabled'],
      cursor: ['disabled'],
      textOpacity: ['group-hover', 'hover', 'disabled'],
      backgroundOpacity: ['hover', 'disabled'],
    },
  },
  plugins: [],
}
