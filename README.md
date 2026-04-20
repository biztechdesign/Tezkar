# TezkarGift - Premium Corporate Gifts eCommerce

Premium eCommerce platform for corporate gifts and custom merchandise in Dubai.

## Tech Stack

- **Framework:** Vite + React 19
- **TypeScript:** 5.9.2
- **Styling:** Tailwind CSS 3.4.17
- **Routing:** React Router 7
- **UI Components:** Radix UI, Material UI
- **Icons:** Lucide React
- **Animations:** Motion

## Brand Colors

- Primary (Gold/Copper): `#C8956C`
- Background: `#FAFAF8`
- Accent: `#E8DDD3`
- Secondary (Dark): `#2C2C2C`
- Teal (CTA): `#044c5c`
- Pink/Magenta (CTA): `#d41c5c`

## Typography

- **Headings:** Poppins
- **Body:** Inter
- **Border Radius:** 0px (sharp corners everywhere)
- **Container Width:** 1400px

## Development

The application uses Vite as the build tool with React 19 and TypeScript 5.9.

## Project Structure

```
/src
├── app/
│   ├── App.tsx              # Main app component with RouterProvider
│   ├── routes.tsx           # React Router configuration
│   └── components/          # All page and UI components
│       ├── header.tsx
│       ├── footer.tsx
│       ├── home-page.tsx
│       ├── product-detail-page.tsx
│       └── ui/              # Radix UI components
│
├── styles/
│   ├── index.css            # Main stylesheet
│   ├── fonts.css            # Font imports
│   ├── theme.css            # Theme variables
│   └── tailwind.css         # Tailwind directives
│
└── imports/                 # Static assets and images
```

## Important Guidelines

1. **Border Radius:** All elements use `border-radius: 0px` (sharp corners)
2. **CTA Buttons:** Only use `#044c5c` (teal) and `#d41c5c` (pink)
3. **Fonts:** Poppins for headings, Inter for body text
4. **Container:** Max-width is `1400px`
5. **React Inline Styles:** Never mix shorthand `border` with individual border properties

## Protected Files

Always read the current state before editing:
- `/src/app/components/header.tsx`
- `/src/app/components/top-ribbon.tsx`
- `/src/app/components/mega-menu.tsx`
- `/src/app/components/contact-page.tsx`
- `/src/app/components/home-page.tsx`
- `/src/app/components/hero-promo-banners.tsx`

## Features

- Multi-page routing with React Router
- Product catalog with categories and filtering
- Shopping cart and quote system
- Account management
- Responsive design
- Custom print t-shirt designer
- RFQ (Request for Quote) functionality
- Credit management for B2B clients

## License

Proprietary - TezkarGift © 2026
