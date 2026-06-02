# Premium Fashion MERN Platform Blueprint

## 1. Current Project Assessment

### What exists today
- Backend Express app with three route groups: user, product, orders.
- MongoDB models for `User` and `Product` only.
- Frontend React/Vite app with a single live homepage, a minimal product page, and a few utility pages.
- Styling is a mix of Tailwind classes and large desktop-first CSS overrides.

### Current weaknesses
- No layered backend architecture: routes and business logic are tightly coupled.
- Missing core domains: category, brand, wishlist, review, coupon, payment, address, admin analytics.
- Authentication is incomplete: login/register exist, but there is no robust JWT session strategy, refresh flow, email verification, password reset, or secure cookie handling.
- Product model is too small for a premium commerce platform: no variants, colors, sizes, brand references, ratings, inventory history, related products, or indexing strategy.
- Cart/order flow is simplistic: cart is embedded in `User`, orders are single-item biased, and checkout/payment state is missing.
- Frontend has no app-level state architecture (Context/Redux Toolkit), no dedicated service layer, no shared design system, and no formal route/layout split.
- Responsive behavior is improving, but the app still needs a more systematic mobile-first component strategy.

## 2. Target Architecture

### Frontend structure
```text
client/
├── assets/
├── components/
├── layouts/
├── pages/
├── routes/
├── hooks/
├── context/
├── redux/
├── services/
├── utils/
├── constants/
├── styles/
└── animations/
```

### Backend structure
```text
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── validators/
├── utils/
└── uploads/
```

## 3. Production-Ready Domain Model

### Core MongoDB collections
- `User`
- `Product`
- `Category`
- `Brand`
- `Cart`
- `Wishlist`
- `Review`
- `Order`
- `Coupon`
- `Address`

### Recommended field strategy
- Use `ObjectId` references for relationships.
- Add compound indexes for search-heavy fields.
- Normalize reusable entities such as category and brand.
- Store cart and wishlist as dedicated collections for guest support and persistence.
- Separate authentication concerns from profile concerns.

## 4. Recommended Schemas

### User
- `name`, `email`, `passwordHash`, `phoneNumber`, `role`, `avatar`, `emailVerified`, `verificationToken`, `resetPasswordToken`, `resetPasswordExpires`, `lastLoginAt`
- References: addresses, cart, wishlist
- Indexes: `email` unique, `role`, `createdAt`

### Product
- `name`, `slug`, `description`, `price`, `compareAtPrice`, `discount`, `category`, `brand`, `gender`, `colors`, `sizes`, `variants`, `inventory`, `images`, `ratingAvg`, `ratingCount`, `isFeatured`, `isTrending`, `isNewArrival`, `isBestSeller`, `isActive`
- References: category, brand, reviews
- Indexes: `slug` unique, `category`, `brand`, `gender`, `price`, `ratingAvg`, text index on `name` and `description`

### Category
- `name`, `slug`, `parent`, `sortOrder`, `isActive`, `thumbnail`
- Indexes: `slug` unique, `parent`

### Brand
- `name`, `slug`, `logo`, `description`, `isActive`
- Indexes: `slug` unique

### Cart
- `user`, `sessionId`, `items[]`, `subtotal`, `discountTotal`, `shippingTotal`, `grandTotal`, `currency`
- `items[]`: `product`, `variant`, `quantity`, `priceSnapshot`
- Supports guest carts via `sessionId`

### Wishlist
- `user`, `sessionId`, `items[]`
- Supports guest wishlist via `sessionId`

### Review
- `user`, `product`, `rating`, `title`, `comment`, `images`, `isVerifiedPurchase`, `status`
- Indexes: `product`, `user`, `rating`

### Order
- `user`, `orderNumber`, `items[]`, `shippingAddress`, `billingAddress`, `paymentMethod`, `paymentStatus`, `orderStatus`, `coupon`, `pricing`, `tracking`, `invoiceUrl`, `timeline[]`
- Indexes: `orderNumber` unique, `user`, `orderStatus`, `createdAt`

### Coupon
- `code`, `type`, `value`, `minOrderAmount`, `usageLimit`, `usageCount`, `startsAt`, `endsAt`, `isActive`
- Indexes: `code` unique, `isActive`, `endsAt`

### Address
- `user`, `fullName`, `phoneNumber`, `country`, `city`, `state`, `zipCode`, `line1`, `line2`, `addressType`, `isDefault`

## 5. API Design

### Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `POST /api/v1/auth/refresh-token`
- `POST /api/v1/auth/forgot-password`
- `POST /api/v1/auth/reset-password`
- `POST /api/v1/auth/change-password`
- `POST /api/v1/auth/verify-email`
- `GET /api/v1/auth/me`

### Profile
- `PUT /api/v1/users/me`
- `PATCH /api/v1/users/avatar`
- `GET /api/v1/users/orders`
- `GET /api/v1/users/wishlist`
- `GET /api/v1/users/addresses`
- `POST /api/v1/users/addresses`
- `PUT /api/v1/users/addresses/:id`
- `DELETE /api/v1/users/addresses/:id`

### Products
- `GET /api/v1/products`
- `GET /api/v1/products/:slug`
- `GET /api/v1/products/:id/related`
- `GET /api/v1/products/trending`
- `GET /api/v1/products/new-arrivals`
- `GET /api/v1/products/best-sellers`
- `POST /api/v1/products` (admin)
- `PUT /api/v1/products/:id` (admin)
- `DELETE /api/v1/products/:id` (admin)

### Search and filters
- `GET /api/v1/search`
- Query params: `q`, `category`, `gender`, `brand`, `size`, `color`, `minPrice`, `maxPrice`, `rating`, `availability`, `sort`, `page`, `limit`

### Cart
- `GET /api/v1/cart`
- `POST /api/v1/cart/items`
- `PATCH /api/v1/cart/items/:itemId`
- `DELETE /api/v1/cart/items/:itemId`
- `DELETE /api/v1/cart`
- `POST /api/v1/cart/coupon`

### Wishlist
- `GET /api/v1/wishlist`
- `POST /api/v1/wishlist/items`
- `DELETE /api/v1/wishlist/items/:productId`
- `POST /api/v1/wishlist/move-to-cart`

### Checkout and orders
- `POST /api/v1/checkout/shipping`
- `POST /api/v1/checkout/delivery-method`
- `POST /api/v1/checkout/payment-method`
- `POST /api/v1/checkout/review`
- `POST /api/v1/orders`
- `GET /api/v1/orders/:id`
- `GET /api/v1/orders/:id/invoice`
- `PATCH /api/v1/orders/:id/cancel`
- `PATCH /api/v1/admin/orders/:id/status`

### Admin
- `GET /api/v1/admin/dashboard`
- `GET /api/v1/admin/orders`
- `GET /api/v1/admin/users`
- `GET /api/v1/admin/products`
- `GET /api/v1/admin/reviews`
- `POST /api/v1/admin/categories`
- `POST /api/v1/admin/brands`

## 6. Backend Layering

### Controller responsibilities
- Controllers validate request shape, call services, and return HTTP responses.
- They must not contain complex business logic.

### Service responsibilities
- Cart pricing calculation
- Product search and filtering
- Order placement and status changes
- Coupon validation
- Payment provider abstraction
- Email delivery
- Image upload orchestration

### Middleware stack
- `authenticateUser`
- `authorizeRoles('admin')`
- `validateRequest`
- `rateLimiter`
- `helmet`
- `sanitizeInput`
- `mongoSanitize`
- `xssClean`
- `errorHandler`
- `notFound`

## 7. Frontend Architecture

### Suggested app layers
- `layouts`: `MainLayout`, `AuthLayout`, `CheckoutLayout`, `AdminLayout`
- `components`: shared UI building blocks
- `pages`: route-level pages
- `services`: axios clients and API wrappers
- `context` / `redux`: auth, cart, wishlist, UI state
- `animations`: Framer Motion presets
- `styles`: design tokens and responsive modules

### Required page set
- Home
- Category listing
- Search results
- Product detail
- Cart drawer
- Wishlist
- Login / Register / Forgot / Reset / Verify email
- Checkout steps
- Profile / orders / addresses
- Admin dashboard

### UI system
- Keep the luxury-fasion aesthetic.
- Use a restrained palette, wide whitespace, sharp typography, and controlled motion.
- Use `clamp()` for type scale.
- Use grid-based product cards with consistent heights.
- Keep touch targets at least `44px`.

## 8. Performance Strategy

### Frontend
- Route-based code splitting with `React.lazy`.
- Memoize expensive list filters.
- Debounce search input.
- Lazy-load product images.
- Use virtualized lists if product counts get large.

### Backend
- Pagination everywhere.
- MongoDB indexes for search and sort.
- Cache hot endpoints like trending, new arrivals, and best sellers.
- Avoid N+1 queries by using `populate` carefully and selectively.

## 9. Security Strategy

- JWT access token in secure httpOnly cookies.
- Refresh tokens with rotation.
- Password hashing with bcrypt.
- `helmet`, `cors`, `express-rate-limit`.
- `express-mongo-sanitize` and XSS escaping.
- Validation via Zod or Joi.
- CSRF protection if cookies are used across origins.
- File upload validation for image type and size.

## 10. SEO Strategy

- Route-level dynamic titles and meta descriptions.
- Open Graph and Twitter cards.
- JSON-LD structured data for products, organization, and breadcrumbs.
- Sitemap generation.
- Canonical URLs.

## 11. Deployment Strategy

### Recommended setup
- Frontend: Vercel or Netlify
- Backend: Render, Fly.io, or ECS
- Database: MongoDB Atlas
- Images: Cloudinary or S3-compatible storage
- Email: SendGrid, Resend, or SES

### Environments
- `development`
- `staging`
- `production`

### CI/CD checks
- Lint
- Build
- Unit tests
- API integration tests
- Lighthouse checks for web vitals

## 12. Immediate Upgrade Plan for This Repo

### Phase 1
- Split backend into `controllers`, `services`, `validators`, `middleware`, `routes`.
- Replace the current `User` and `Product` models with richer schemas.
- Add `Category`, `Brand`, `Cart`, `Wishlist`, `Review`, `Order`, `Coupon`, and `Address` models.
- Add auth middleware and secure cookie-based JWT.

### Phase 2
- Introduce a frontend service layer and route-based layouts.
- Move global state into Redux Toolkit or Context + reducers.
- Add responsive mobile navigation, cart drawer, and checkout flow.
- Add Framer Motion transitions and skeleton loaders.

### Phase 3
- Build admin dashboard, analytics, and moderation tools.
- Add payment provider abstraction.
- Add SEO metadata and deployment automation.

## 13. Conclusion

The current codebase is a useful MVP, but it is not yet structured for a premium fashion commerce platform at scale. The architecture above is the production-ready target: layered backend, normalized schemas, responsive luxury UI, secure auth, SEO, and performant shopping flows.
