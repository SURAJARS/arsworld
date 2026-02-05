# ARS Electronics World - E-Commerce Platform

## Complete Project Documentation

---

## 📋 TABLE OF CONTENTS

1. [Project Overview](#project-overview)
2. [Requirements](#requirements)
3. [Features](#features)
4. [Tech Stack](#tech-stack)
5. [Database Schema](#database-schema)
6. [API Endpoints](#api-endpoints)
7. [Project Structure](#project-structure)
8. [Setup Instructions](#setup-instructions)
9. [Key Implementation Details](#key-implementation-details)

---

## 🎯 PROJECT OVERVIEW

**Project Name:** ARS Electronics World E-Commerce Platform

**Description:** A full-stack e-commerce platform designed for ARS Electronics, a premium electronics retailer based in Ranipet, Tamil Nadu. The platform enables customers to browse, purchase electronics and home appliances with multi-language support (English/Tamil), integrated payment processing, and comprehensive admin management.

**Client:** ARS Electronics World
**Location:** Krishnagiri, Tamil Nadu, India
**Contact:**

- Phone: 9842236692
- WhatsApp: 9842236692
- Landline: 04343 236697
- Email: arselectronicsworld@gmail.com

**Google Maps Location:** https://maps.app.goo.gl/SboLLVD4113zkatT6

---

## 📋 REQUIREMENTS

### Functional Requirements

1. **Product Management**
   - Display product catalog with multi-language support
   - Product details with images, pricing, and descriptions
   - Product filtering (by use cases, popularity, availability)
   - Product categories (Electronics, Home Appliances, etc.)
   - Enable/Disable products from customer view
   - Mark products as popular/featured

2. **Shopping Cart & Checkout**
   - Add/Remove products to cart
   - Persist cart data across sessions (localStorage)
   - View cart with itemized pricing
   - Adjust quantities
   - Calculate totals with tax/pricing breakdown
   - Secure checkout process

3. **Payment Integration**
   - Razorpay payment gateway integration
   - Signature verification for secure transactions
   - Order confirmation after successful payment
   - Email notifications to store owner for new orders

4. **Order Management**
   - Create orders from checkout
   - Store order details in database
   - Order status tracking
   - Display order history
   - Admin order viewing with all details

5. **Customer Contact & Enquiries**
   - Contact information display (phone, WhatsApp, email)
   - Enquiry form submission
   - Email notifications to store owner
   - Enquiry management in admin panel
   - YouTube video embed for location
   - Google Maps integration for directions

6. **Admin Dashboard**
   - Product CRUD operations (Create, Read, Update, Delete)
   - Product visibility toggle
   - Product image management
   - Order viewing and management
   - Enquiry viewing
   - Settings management (festival banner, promotions)
   - Admin authentication bypass for initial setup

7. **Multi-Language Support**
   - English (EN)
   - Tamil (TA)
   - Switch between languages
   - Translated UI labels and content

8. **Service Portal**
   - Brand service information
   - Contact details for major electronics brands
   - Service center locators
   - Warranty information

9. **eCatalogue**
   - PDF or web-based product catalog
   - Professional presentation of all products

---

### Non-Functional Requirements

1. **Performance**
   - Page load time < 3 seconds
   - Optimized image handling
   - Efficient database queries

2. **Security**
   - Secure payment processing
   - Password hashing for future authentication
   - CORS configuration for API
   - Request validation on backend

3. **Scalability**
   - Modular component architecture
   - Database indexing for common queries
   - API versioning ready

4. **Availability**
   - 24/7 uptime for shopping and browsing
   - Error handling and recovery

5. **Accessibility**
   - Mobile-responsive design
   - Multi-device support
   - Keyboard navigation

---

## ✨ FEATURES

### Customer Features

#### 1. **Home Page**

- Responsive carousel with ARS branded content
  - "ARS Premium Electronics"
  - "ARS Home Appliances"
  - "ARS Special Offers"
  - "ARS Fast Delivery"
- Featured/Popular products showcase
- Customer testimonials
- Featured brands section
- Quick feature highlights
- Newsletter subscription prompt
- Festival banner with promotions

#### 2. **Product Catalog**

- Browse all products with grid layout
- Product cards showing:
  - Product image
  - Product name (EN/TA)
  - Price
  - Rating/reviews
  - "Add to Cart" button
- Filter by use cases:
  - Small Families
  - Large Families
  - Energy Saving
  - Premium
  - Popular
- Search functionality
- Product categories

#### 3. **Product Details Page**

- Large product images (multiple images)
- Detailed product information:
  - Name in English and Tamil
  - Full description in EN/TA
  - Price breakdown
  - Specifications
  - Use cases
  - Rating and reviews
- "Add to Cart" with quantity selector
- Related products
- Customer reviews section
- Warranty information

#### 4. **Shopping Cart**

- View all added items
- Adjust quantities
- Remove items
- Display item subtotals
- Shipping cost calculation
- Tax calculation
- Order total
- Persistent storage (localStorage)
- "Continue Shopping" and "Proceed to Checkout" buttons

#### 5. **Checkout Process**

- Order summary display
- Delivery address form:
  - Full name
  - Email
  - Phone number
  - Delivery address
  - City
  - Postal code
  - Special instructions
- Price breakdown showing:
  - Subtotal
  - Shipping
  - Tax
  - Grand Total
- Razorpay payment gateway
- Order confirmation email to admin

#### 6. **Contact Page**

- Contact information display
  - Phone numbers
  - WhatsApp link
  - Email address
- YouTube video embed showing store location
- Contact form for enquiries:
  - Name
  - Email
  - Message
- Email notifications to admin for enquiries
- Social media links
- Google Maps link for directions

#### 7. **Services Page**

- Brand service information for 8+ major brands:
  - Samsung
  - LG
  - Whirlpool
  - Godrej
  - Bosch
  - IFB
  - Panasonic
  - Daikin
- Service numbers and contact details
- Service center locators
- Warranty claim information
- Extended warranty options
- Installation support details

#### 8. **eCatalogue**

- Professional product catalog view
- All products listed with details
- Printable/downloadable format
- Categorized listings

#### 9. **Comparison Tool**

- Compare products side by side
- Select multiple products
- View specification differences
- Price comparison

#### 10. **Multi-Language Support**

- Language toggle (English/Tamil)
- Persistent language preference
- Translated content across all pages
- Support for RTL text where needed

---

### Admin Features

#### 1. **Dashboard Overview**

- Quick statistics:
  - Total products
  - Total orders
  - Pending enquiries
  - Total revenue (if implemented)
- Access to all management modules

#### 2. **Product Management**

- **List Products Tab:**
  - View all products (enabled and disabled)
  - Search products
  - Sort by various criteria
  - Quick actions: Edit, Hide/Show, Delete
  - Delete with confirmation dialog
  - Product status indicators

- **Add Product Tab:**
  - Form to create new products
  - Fields:
    - Product name (EN/TA)
    - Description (EN/TA)
    - Price
    - Images (multiple URLs, comma-separated)
    - Use cases (multi-select)
    - Popular toggle
    - Enabled toggle
  - Validation
  - Success/error messaging

- **Edit Product Tab:**
  - Update existing product details
  - Edit name (EN/TA)
  - Edit description (EN/TA)
  - Edit price
  - Edit images with preview
  - Toggle enabled/disabled status
  - Toggle popular status
  - Save changes

#### 3. **Order Management**

- View all orders
- Display order information:
  - Order ID
  - Customer name
  - Order date
  - Total amount
  - Payment status
  - Delivery address
  - Items ordered
- Search orders
- Export/Print orders

#### 4. **Enquiry Management**

- View all customer enquiries
- Display enquiry details:
  - Customer name
  - Email
  - Message
  - Submission date
  - Contact information
- Search enquiries
- Mark as resolved/pending
- Reply to enquiries

#### 5. **Settings Management**

- Festival banner settings
  - Toggle promotions
  - Set discount percentage
  - Display promotional text (EN/TA)
- Store information updates
- Email configuration
- Payment settings

#### 6. **Authentication**

- Currently: No authentication required (temporary for setup)
- Future: Username/password authentication
- Admin role verification
- Session management

---

## 🛠 TECH STACK

### Frontend

```
Framework: Next.js 14.2.35
Language: JavaScript/React
Styling: Tailwind CSS
State Management: React Context API (Cart Context)
Storage: localStorage for cart persistence
HTTP Client: Axios
Internationalization: Custom i18n context (EN/TA)
```

### Backend

```
Runtime: Node.js
Framework: Express.js
Language: JavaScript
Database: MongoDB (Atlas)
Email Service: Nodemailer
Payment Gateway: Razorpay SDK
Authentication: JWT (prepared for future use)
Request Validation: Custom middleware
Error Handling: Try-catch with detailed error messages
Payload Limit: 50MB (for base64 image uploads)
```

### Database

```
Provider: MongoDB Atlas (Cloud)
Collections:
  - products
  - orders
  - enquiries
  - settings
  - users (prepared for future)
```

### Deployment

```
Frontend: Vercel (or localhost:3000 for development)
Backend: Local Node.js server (port 5000)
Database: MongoDB Atlas Cloud
```

### Development Tools

```
Version Control: Git
Package Manager: npm
Development: Local development servers
Testing: Manual testing
Documentation: Markdown
```

---

## 📊 DATABASE SCHEMA

### Products Collection

```javascript
{
  _id: ObjectId,
  name: {
    en: String,
    ta: String
  },
  description: {
    en: String,
    ta: String
  },
  price: Number,
  images: [String],           // Array of image URLs
  useCases: [String],         // ['small_families', 'energy_saving', etc.]
  specifications: Object,     // Dynamic specifications
  rating: Number,             // 0-5
  reviews: [
    {
      user: String,
      rating: Number,
      comment: String,
      date: Date
    }
  ],
  isEnabled: Boolean,         // Show/hide from customers
  isPopular: Boolean,         // Featured product
  createdAt: Date,
  updatedAt: Date
}
```

### Orders Collection

```javascript
{
  _id: ObjectId,
  customerInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String
  },
  items: [
    {
      productId: ObjectId,
      productName: String,
      quantity: Number,
      price: Number,
      subtotal: Number
    }
  ],
  pricing: {
    subtotal: Number,
    shipping: Number,
    tax: Number,
    total: Number
  },
  paymentInfo: {
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: String    // 'pending', 'completed', 'failed'
  },
  orderStatus: String,  // 'pending', 'processing', 'shipped', 'delivered'
  createdAt: Date,
  updatedAt: Date
}
```

### Enquiries Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  message: String,
  phone: String,
  status: String,     // 'new', 'read', 'resolved'
  createdAt: Date,
  updatedAt: Date
}
```

### Settings Collection

```javascript
{
  _id: ObjectId,
  festivalBanner: {
    isActive: Boolean,
    title: {
      en: String,
      ta: String
    },
    discountPercentage: Number,
    endDate: Date
  },
  storeInfo: {
    name: String,
    address: String,
    phone: String,
    email: String
  },
  updatedAt: Date
}
```

---

## 🔌 API ENDPOINTS

### Base URLs

```
Frontend: http://localhost:3000
Backend: http://localhost:5000
```

### Products Endpoints

| Method | Endpoint                  | Description              | Auth |
| ------ | ------------------------- | ------------------------ | ---- |
| GET    | `/api/products`           | Get all enabled products | No   |
| GET    | `/api/products/:id`       | Get product by ID        | No   |
| GET    | `/api/products/admin/all` | Get all products (admin) | No\* |
| POST   | `/api/products`           | Create product           | No\* |
| PUT    | `/api/products/:id`       | Update product           | No\* |
| DELETE | `/api/products/:id`       | Delete product           | No\* |

### Orders Endpoints

| Method | Endpoint                       | Description            | Auth |
| ------ | ------------------------------ | ---------------------- | ---- |
| POST   | `/api/orders`                  | Create new order       | No   |
| GET    | `/api/orders/:id`              | Get order by ID        | No   |
| GET    | `/api/orders/admin/all-orders` | Get all orders (admin) | No\* |
| PUT    | `/api/orders/:id`              | Update order status    | No\* |

### Payment Endpoints

| Method | Endpoint                     | Description              | Auth |
| ------ | ---------------------------- | ------------------------ | ---- |
| POST   | `/api/payments/create-order` | Create Razorpay order    | No   |
| POST   | `/api/payments/verify`       | Verify payment signature | No   |

### Enquiries Endpoints

| Method | Endpoint             | Description               | Auth |
| ------ | -------------------- | ------------------------- | ---- |
| POST   | `/api/enquiries`     | Submit new enquiry        | No   |
| GET    | `/api/enquiries`     | Get all enquiries (admin) | No\* |
| PUT    | `/api/enquiries/:id` | Update enquiry status     | No\* |

### Settings Endpoints

| Method | Endpoint        | Description             | Auth |
| ------ | --------------- | ----------------------- | ---- |
| GET    | `/api/settings` | Get all settings        | No   |
| PUT    | `/api/settings` | Update settings (admin) | No\* |

**Auth marked as "No\*" means temporarily disabled for initial setup**

---

## 📁 PROJECT STRUCTURE

```
electronics_store/
│
├── frontend/                          # Next.js Frontend
│   ├── pages/
│   │   ├── index.js                   # Home page
│   │   ├── products.js                # Product listing
│   │   ├── products/[id].js           # Product details
│   │   ├── cart.js                    # Shopping cart
│   │   ├── checkout.js                # Checkout page
│   │   ├── contact.js                 # Contact page with YouTube
│   │   ├── services.js                # Brand services
│   │   ├── ecatalogue.js              # E-catalogue
│   │   ├── compare.js                 # Product comparison
│   │   ├── admin/
│   │   │   ├── index.js               # Admin dashboard
│   │   │   ├── add-product.js         # Add product form
│   │   │   └── edit-product/index.js  # Edit product form
│   │   └── api/                       # API routes
│   │
│   ├── components/
│   │   ├── Header.js                  # Navigation header
│   │   ├── Footer.js                  # Footer with Google Maps
│   │   ├── Carousel.js                # Home carousel with ARS branding
│   │   ├── ProductCard.js             # Reusable product card
│   │   ├── CartContext.js             # Cart state management
│   │   └── ...
│   │
│   ├── utils/
│   │   ├── api.js                     # API calls (Axios instances)
│   │   ├── i18n/
│   │   │   ├── context.js             # i18n context
│   │   │   ├── translations.js        # EN/TA translations
│   │   │   └── languages.js           # Language config
│   │   └── ...
│   │
│   ├── styles/
│   │   └── globals.css                # Global Tailwind styles
│   │
│   ├── public/
│   │   ├── images/                    # Static images
│   │   └── ...
│   │
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .env.local
│
├── backend/                           # Express.js Backend
│   ├── src/
│   │   ├── server.js                  # Main server file
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB connection
│   │   ├── models/
│   │   │   ├── Product.js             # Product schema
│   │   │   ├── Order.js               # Order schema
│   │   │   ├── Enquiry.js             # Enquiry schema
│   │   │   └── Settings.js            # Settings schema
│   │   ├── routes/
│   │   │   ├── productRoutes.js       # Product endpoints
│   │   │   ├── orderRoutes.js         # Order endpoints
│   │   │   ├── paymentRoutes.js       # Payment endpoints
│   │   │   ├── enquiryRoutes.js       # Enquiry endpoints
│   │   │   └── settingsRoutes.js      # Settings endpoints
│   │   ├── controllers/
│   │   │   ├── productController.js   # Product logic
│   │   │   ├── orderController.js     # Order logic
│   │   │   ├── paymentController.js   # Payment logic
│   │   │   ├── enquiryController.js   # Enquiry logic
│   │   │   └── settingsController.js  # Settings logic
│   │   ├── middleware/
│   │   │   ├── errorHandler.js        # Error handling
│   │   │   ├── validation.js          # Input validation
│   │   │   └── auth.js                # Auth middleware (prepared)
│   │   └── utils/
│   │       ├── emailService.js        # Nodemailer setup
│   │       └── constants.js           # App constants
│   │
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── README.md
├── PROJECT_DOCUMENTATION.md           # This file
├── FEATURES_GUIDE.md
├── BRANDING_UPDATE_COMPLETE.md
└── .gitignore
```

---

## 🚀 SETUP INSTRUCTIONS

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account
- Razorpay account
- Gmail account (for Nodemailer)

### Frontend Setup

1. **Install dependencies:**

```bash
cd frontend
npm install
```

2. **Create `.env.local`:**

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=ARS Electronics World
```

3. **Run development server:**

```bash
npm run dev
```

Access at: `http://localhost:3000`

### Backend Setup

1. **Install dependencies:**

```bash
cd backend
npm install
```

2. **Create `.env`:**

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/electronics_store
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
STORE_EMAIL=arselectronicsworld@gmail.com
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

3. **Run server:**

```bash
npm start
# or for development with auto-reload
npm run dev
```

Server runs on: `http://localhost:5000`

### Database Setup

1. Create MongoDB Atlas cluster
2. Create database: `electronics_store`
3. Run seed data script (optional):

```bash
node backend/scripts/seedData.js
```

4. Collections will be auto-created on first API call

---

## 🔑 KEY IMPLEMENTATION DETAILS

### 1. **Multi-Language Implementation**

- Custom i18n context with React Context API
- Translations stored in `utils/i18n/translations.js`
- Language preference saved to localStorage
- All UI elements use `t()` function for translations
- Support for English (EN) and Tamil (TA)

### 2. **Shopping Cart Implementation**

- React Context API for state management
- Cart data persisted to localStorage
- Automatic calculation of totals, tax, shipping
- Cart survives page refreshes and session restarts

### 3. **Payment Integration**

- Razorpay SDK for payment gateway
- Payment flow:
  1. Create order on backend
  2. Open Razorpay modal on frontend
  3. Customer pays
  4. Signature verification on backend
  5. Order saved to database
  6. Email sent to admin
- Secure signature verification prevents tampering

### 4. **Image Handling**

- Multiple image URLs supported per product
- 50MB payload limit for base64 uploads
- Graceful image error handling with fallback
- Image preview in product edit admin panel

### 5. **Email Notifications**

- Nodemailer configured with Gmail SMTP
- Notifications sent for:
  - New orders (to admin)
  - Customer enquiries (to admin)
- Email templates with styled HTML
- Order details included in email

### 6. **Admin Authentication (Prepared)**

- Temporary bypass: No authentication required
- TODO: Add JWT-based authentication
- Future: Role-based access control (RBAC)
- Comments in code indicate where auth should be re-enabled

### 7. **Error Handling**

- Try-catch blocks in all async operations
- Detailed error messages for debugging
- User-friendly error displays
- Server-side validation
- Client-side validation

### 8. **Responsive Design**

- Mobile-first approach with Tailwind CSS
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Tested on iPhone, iPad, Desktop
- Flexible grid layouts for products

### 9. **Product Filtering**

- Filter by use cases (Small Families, Large Families, Energy Saving, Premium)
- Search by product name
- Sort by price, newest, popular
- Enable/disable visibility from admin

### 10. **API Architecture**

- RESTful API design
- Consistent response format
- Error handling middleware
- CORS enabled for frontend access
- Request logging (optional)

---

## 📱 RESPONSIVE DESIGN SPECIFICATIONS

### Mobile (< 640px)

- Single column layout
- Full-width inputs
- Large touch targets (48px minimum)
- Stacked navigation

### Tablet (640px - 1024px)

- 2-column product grid
- Side-by-side forms
- Optimized spacing

### Desktop (> 1024px)

- 4-column product grid
- Multi-column layouts
- Full feature utilization

---

## 🔐 SECURITY FEATURES

1. **Payment Security**
   - Razorpay signature verification
   - HTTPS ready
   - No sensitive data stored in frontend

2. **Data Validation**
   - Input sanitization
   - Type checking
   - Email validation
   - Phone format validation

3. **CORS Configuration**
   - Restricted to frontend origin
   - Prevents unauthorized access

4. **Error Messages**
   - Generic error messages to users
   - Detailed logs on backend

---

## 📊 SAMPLE DATA STRUCTURE

### Sample Product

```javascript
{
  name: {
    en: "Samsung 55\" Smart TV",
    ta: "சாம்சங் 55\" ஸ்மார்ட் டிவி"
  },
  price: 45999,
  images: ["https://...1.jpg", "https://...2.jpg"],
  useCases: ["large_families", "premium"],
  isEnabled: true,
  isPopular: true
}
```

### Sample Order

```javascript
{
  customerInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Main Street"
  },
  items: [
    {
      productName: "Samsung TV",
      quantity: 1,
      price: 45999
    }
  ],
  pricing: {
    subtotal: 45999,
    shipping: 500,
    tax: 8280,
    total: 54779
  }
}
```

---

## 🎨 BRANDING ELEMENTS

### Colors

- Primary: Yellow (#FFC107, #FFB300) - ARS Brand
- Secondary: Dark Gray (#1F2937)
- Accent: Various gradients
- White: #FFFFFF
- Black: #000000

### Typography

- Brand Font: Applied across headers
- Body Font: System fonts for accessibility
- Sizes: 12px to 56px depending on component

### Branding Applied

- Logo: SVG leaves design
- Carousel: "ARS" prefix on all slide titles
- Footer: Links to Google Maps with ARS location
- Services: Brand names instead of emojis
- Overall: Consistent yellow/gold accents

---

## 📈 SCALABILITY CONSIDERATIONS

1. **Database Indexing**
   - Index on product ID
   - Index on order customer email
   - Index on enquiry creation date

2. **Caching**
   - Can implement Redis for frequently accessed products
   - Client-side caching with Next.js ISR

3. **CDN**
   - Images can be served via CDN
   - Static assets via Vercel/CDN

4. **API Rate Limiting**
   - Can add middleware for rate limiting
   - Prevent abuse

5. **Load Balancing**
   - Multiple backend instances with load balancer
   - Database replica sets for redundancy

---

## 🐛 KNOWN ISSUES & TODOs

### Current State

- ✅ Fully functional e-commerce platform
- ✅ Admin CRUD operations
- ✅ Payment processing
- ✅ Multi-language support
- ✅ Email notifications
- ✅ YouTube video embed
- ✅ Google Maps integration

### TODOs

- [ ] Re-enable authentication (add JWT)
- [ ] Add role-based access control
- [ ] Implement product reviews
- [ ] Add user accounts
- [ ] Order status notifications
- [ ] Inventory management
- [ ] Advanced analytics
- [ ] Performance optimization
- [ ] Add unit tests
- [ ] Add integration tests

---

## 📞 SUPPORT & CONTACTS

**Store Information:**

- Business Name: ARS Electronics World
- Location: Ranipet, Tamil Nadu
- Phone: 9842236692
- WhatsApp: 9842236692
- Landline: 04343 236697
- Email: arselectronicsworld@gmail.com
- Google Maps: https://maps.app.goo.gl/SboLLVD4113zkatT6

---

## 📄 LICENSE & USAGE

This project is custom-built for ARS Electronics World. All code, designs, and features are proprietary.

---

## 📚 ADDITIONAL RESOURCES

- [Next.js Documentation](https://nextjs.org)
- [Express.js Documentation](https://expressjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Razorpay Integration Guide](https://razorpay.com/docs)

---

**Document Version:** 1.0
**Last Updated:** January 29, 2026
**Maintained By:** ARS Electronics World Development Team

---
