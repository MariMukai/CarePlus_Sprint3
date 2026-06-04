/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0faf5',
          100: '#dbf3e6',
          200: '#b7e6cd',
          300: '#84d3ab',
          400: '#4bb884',
          500: '#1c9770',
          600: '#157a5b',
          700: '#11614a',
          800: '#0d4d3c',
          900: '#0a3d31',
          950: '#053024'
        },
        lime: {
          50: '#f7fbe9',
          100: '#eef5d8',
          200: '#dbecaa',
          300: '#c0dd76',
          400: '#a4ca4a',
          500: '#93cb52',
          600: '#6f9a2e',
          700: '#557627',
          800: '#445e23',
          900: '#395020'
        },
        ink: {
          DEFAULT: '#10221a',
          mid: '#435d50',
          soft: '#748a80'
        }
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 14px 44px rgba(28, 151, 112, 0.12)',
        strong: '0 24px 68px rgba(28, 151, 112, 0.18)',
        lime: '0 10px 30px rgba(147, 203, 82, 0.35)'
      },
      borderRadius: {
        '4xl': '2rem'
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 18s linear infinite'
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        pulseSoft: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.9' },
          '50%': { transform: 'scale(1.08)', opacity: '1' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' }
        }
      }
    }
  },
  plugins: []
};
