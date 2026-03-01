# LuminaMart Ecommerce

A simple ecommerce assignment built with React, Redux Toolkit, and DummyJSON APIs.

## Deployment URL

- Live Demo: https://ecommerce-assignment-vishal.vercel.app/

## Tech Stack

- React 19
- Vite 7
- Redux Toolkit + React Redux
- React Router DOM
- Axios
- Tailwind CSS v4
- Lucide React

## Features

- User login with token storage
- Fetch logged-in user profile on reload
- Product listing from API
- Category filter
- Pagination
- Add to cart
- Increase/decrease/remove cart items
- Cart sidebar with total amount
- Responsive UI
- Dark mode toggle

## Installation Steps

1. Clone the repository

```bash
git clone https://github.com/vishalamin200/Ecommerce-assignment
cd ecommerce
```

2. Install dependencies

```bash
npm install
```

3. Run development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

5. Preview production build

```bash
npm run preview
```

## Folder Structure

```
ecommerce/
├── public/
├── src/
│   ├── assets/                 # Images, icons, fonts, etc.
│   ├── components/             # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── ProductCard.jsx
│   │   └── CartSidebar.jsx
│   ├── features/               # Redux feature slices
│   │   ├── auth/
│   │   │   └── authSlice.js
│   │   ├── cart/
│   │   │   └── cartSlice.js
│   │   └── products/
│   │       └── productSlice.js
│   ├── pages/                  # Application pages
│   │   ├── Home.jsx
│   │   └── Login.jsx
│   ├── redux/                  # Redux store configuration
│   │   └── store.js
│   ├── App.jsx                 # Root component
│   ├── main.jsx                # Application entry point
│   └── index.css               # Global styles
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Scripts

- `npm run dev` - start development server
- `npm run build` - create production build
- `npm run preview` - preview production build
- `npm run lint` - run ESLint

## API Used

- `https://dummyjson.com/auth/login`
- `https://dummyjson.com/auth/me`
- `https://dummyjson.com/products`
- `https://dummyjson.com/products/category/:category`
- `https://dummyjson.com/products/categories`
