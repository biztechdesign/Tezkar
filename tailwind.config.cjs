/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // TezkarGift brand colors
        primary: {
          DEFAULT: '#C8956C',      // gold/copper
          foreground: 'hsl(var(--primary-foreground))',
        },
        background: {
          DEFAULT: '#FAFAF8',       // warm off-white
          foreground: 'hsl(var(--foreground))',
        },
        accent: {
          DEFAULT: '#E8DDD3',        // light warm beige
          foreground: 'hsl(var(--accent-foreground))',
        },
        secondary: {
          DEFAULT: '#2C2C2C',        // dark gray
          foreground: 'hsl(var(--secondary-foreground))',
        },
        brand: {
          pink: '#d41c5c',           // pink/magenta
          teal: '#044c5c',           // teal
        },
        // CSS variable-based colors for components
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        'none': '0px',
        DEFAULT: '0px',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      maxWidth: {
        'container': '1400px',
      },
    },
  },
  plugins: [],
}
