# PharmaGrid

**Pharmacy-grade skincare e-commerce platform** — built by Anjeza & Merita.

---

## Overview

PharmaGrid is a full-stack skincare e-commerce application featuring a personalised routine quiz, product reviews, order management, and an admin dashboard. It carries 50+ products across 8 expert brands from France and Korea.

---

## Tech Stack

### Frontend
- **Angular 19** — standalone components, signals, new control flow (`@if`, `@for`)
- **Angular Material** — tabs, expansion panels, chips, spinners
- **TypeScript** — strict typing throughout
- **SCSS** — component-scoped styles with CSS custom properties
- **jsPDF** — client-side PDF export for personalised routines

### Backend
- **Node.js + Express 5** — REST API
- **PostgreSQL** via **Supabase** — cloud-hosted database
- **pg** — direct connection pool (custom auth, RLS disabled)
- **JWT + bcrypt** — authentication and password hashing
- **Resend** — transactional email for newsletter subscriptions
- **nodemon** — development hot reload

---

## Project Structure

```
pharmagrid/
├── backend/
│   ├── config/
│   │   └── db.js                  # PostgreSQL connection pool
│   ├── controllers/
│   │   ├── authController.js      # Register, login, profile
│   │   ├── productController.js   # Product listing and detail
│   │   ├── orderController.js     # Order creation and retrieval
│   │   ├── adminController.js     # Admin product and order management
│   │   ├── reviewController.js    # Product reviews (upsert)
│   │   └── newsletterController.js # Newsletter subscription + email
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT protect + adminOnly guards
│   ├── models/
│   │   ├── userModel.js
│   │   ├── productModel.js
│   │   └── orderModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── newsletterRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── src/
    └── src/
        └── app/
            ├── core/
            │   ├── header/            # Sticky nav with mobile menu, search
            │   └── footer/            # Links, newsletter subscribe
            ├── features/
            │   ├── auth/
            │   │   ├── login/
            │   │   └── register/
            │   ├── products/
            │   │   ├── pages/
            │   │   │   ├── products-page/   # Filter sidebar + product grid
            │   │   │   └── product-detail/  # Tabs, reviews, related products
            │   │   └── product.service.ts
            │   ├── cart/
            │   │   └── cart-page/     # Cart with quantity controls
            │   ├── checkout/
            │   │   └── checkout-page/ # Reactive form, delivery options
            │   └── order/
            │       └── order-confirmation-page/
            ├── layout/
            │   └── layout/            # Header + router-outlet + Footer shell
            ├── pages/
            │   ├── home/              # Hero, trust bar, featured, quiz, brands
            │   ├── admin/             # Product & order management dashboard
            │   ├── my-orders/         # Order history with timeline
            │   ├── routine-result/    # Quiz results + PDF export
            │   ├── profile/           # Update name and password
            │   ├── about/
            │   ├── contact/
            │   └── privacy/
            └── shared/
                ├── services/
                │   ├── auth.service.ts
                │   ├── cart.service.ts
                │   ├── order.service.ts
                │   └── toast.service.ts
                ├── guards/
                │   ├── auth.guard.ts
                │   └── admin.guard.ts
                ├── product-card/
                ├── star-rating/
                └── toast/
```

---

## Database Schema

```sql
-- Users (custom auth, not Supabase Auth)
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  full_name     TEXT NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role          TEXT DEFAULT 'user'  -- 'user' | 'admin'
);

-- Products
CREATE TABLE products (
  id                  SERIAL PRIMARY KEY,
  name                TEXT NOT NULL,
  brand               TEXT,
  category            TEXT,           -- Cleanser | Moisturizer | Serum | Sunscreen | Treatment | Makeup
  skin_type           TEXT,
  skin_concern        TEXT,
  price               NUMERIC(10,2),
  description         TEXT,
  ingredients         TEXT,
  usage_instructions  TEXT,
  warnings            TEXT,
  image               TEXT,
  stock               INTEGER DEFAULT 0,
  rating              NUMERIC(3,2) DEFAULT 0,
  is_active           BOOLEAN DEFAULT TRUE
);

-- Orders
CREATE TABLE orders (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER REFERENCES users(id),
  total_amount    NUMERIC(10,2),
  delivery_method TEXT,               -- 'Pickup' | 'Delivery'
  status          TEXT DEFAULT 'Pending',
  created_at      TIMESTAMP DEFAULT NOW()
);

-- Order line items
CREATE TABLE order_items (
  id          SERIAL PRIMARY KEY,
  order_id    INTEGER REFERENCES orders(id),
  product_id  INTEGER REFERENCES products(id),
  quantity    INTEGER,
  price       NUMERIC(10,2)
);

-- Product reviews (one per user per product)
CREATE TABLE reviews (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER REFERENCES products(id),
  user_id     INTEGER REFERENCES users(id),
  rating      INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment     TEXT,
  created_at  TIMESTAMP DEFAULT NOW(),
  UNIQUE(product_id, user_id)
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id         SERIAL PRIMARY KEY,
  email      TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## API Endpoints

### Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | — | Register new user |
| POST | `/login` | — | Login, returns JWT |
| POST | `/me` | ✓ | Get current user |
| GET | `/profile` | ✓ | Get profile |
| PUT | `/profile` | ✓ | Update name / password |

### Products — `/api/products`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | — | Get all active products (filterable) |
| GET | `/:id` | — | Get single product |
| GET | `/:productId/reviews` | — | Get reviews for product |
| POST | `/:productId/reviews` | ✓ | Submit or update review |

### Orders — `/api/orders`
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | — | Create order |
| GET | `/user/:userId` | ✓ | Get orders for user |

### Admin — `/api/admin` (admin only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products` | All products |
| POST | `/products` | Create product |
| PUT | `/products/:id` | Update product |
| PATCH | `/products/:id/activate` | Activate product |
| PATCH | `/products/:id/deactivate` | Deactivate product |
| GET | `/orders` | All orders |
| PATCH | `/orders/:id/status` | Update order status |
| GET | `/orders/pending-count` | Count of pending orders |

### Newsletter — `/api/newsletter`
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/subscribe` | Subscribe email + send welcome email |

---

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase project (PostgreSQL)
- A Resend account for emails (free tier)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:
```env
DATABASE_URL=your_supabase_connection_string
JWT_SECRET=your_jwt_secret_key
RESEND_API_KEY=your_resend_api_key
PORT=5000
```

Start the server:
```bash
npm run dev      # development with nodemon
npm start        # production
```

### Frontend Setup

```bash
cd src
npm install
ng serve
```

The app runs on `http://localhost:4200` and expects the backend at `http://localhost:5000`.

To change the API URL, edit:
```ts
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

---

## Key Features

- **Personalised Routine Quiz** — 3-step quiz matches products to skin type and concern, with PDF export
- **Product Reviews** — star rating system with upsert (one review per user per product), auto-updates product average rating
- **Admin Dashboard** — manage products (activate/deactivate, edit) and orders (update status), pending order badge
- **Cart Persistence** — cart survives page refresh via localStorage
- **JWT Authentication** — token stored in localStorage, role-based access for admin routes
- **Live Search** — search by product name or brand from the header
- **Order Timeline** — visual status tracker on My Orders page
- **Mobile Responsive** — all pages optimised for mobile with collapsible nav menu

---

## Brands

| Brand | Origin |
|-------|--------|
| Bioderma | France |
| Avène | France |
| TirTir | Korea |
| Medicube | Korea |
| Purito | Korea |
| Geek & Gorgeous | Hungary |
| Mary & May | Korea |
| Biodance | Korea |
---
