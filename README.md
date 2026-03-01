# LuminaMart Ecommerce

A simple ecommerce assignment built with React, Redux Toolkit, and DummyJSON APIs.

## Deployment URL

- Live Demo: `https://ecommerce-assignment-vishal.vercel.app/` (example: Vercel/Netlify link)

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
git clone <your-repo-url>
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

```text
ecommerce/
  public/
  src/
    assets/
    components/
      Navbar.jsx
      ProductCard.jsx
      cartSidebar.jsx
    features/
      auth/
        authSlice.js
      cart/
        cartSlice.js
      products/
        productSlice.js
    pages/
      Home.jsx
      Login.jsx
    redux/
      store.js
    App.jsx
    main.jsx
    index.css
  package.json
  vite.config.js
  eslint.config.js
  README.md
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
