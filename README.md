# ARS Electronics World - Online Appliance Store

A complete full-stack e-commerce solution for a local electronics shop selling home appliances like TVs, Refrigerators, Cookers, Mixers, etc.

## 🌟 Features

### Core Features

- **Bilingual Support** (English + Tamil)
  - Complete UI in both languages
  - Language toggle in header
  - User language preference storage

- **Use-Based Product Browsing** (Not Stock-Based)
  - Browse by use case: Small Families, Large Families, Energy Saving, Premium
  - Popular products section
  - No stock/availability tracking visible to customers
  - Availability handled via call/WhatsApp

- **Razorpay Payment Integration**
  - Secure online checkout
  - Payment verification
  - Order confirmation

- **User Authentication**
  - JWT-based login/signup
  - User dashboard
  - Order history
  - Profile management

- **Admin Dashboard** (Simple & Non-Technical)
  - Product management (CRUD)
  - Order management
  - Enquiry tracking
  - Festival greeting banner control
  - Settings management

- **Smart Features**
  - ⭐ Popular in Our Shop badge
  - 🔁 Buy Again button for previous purchases
  - 📍 Location-based trust message
  - 🎉 Festival greeting banner
  - 💬 WhatsApp enquiry with auto-filled messages
  - ⚖️ Product comparison (max 3 products)
  - 🏠 Use-case based browsing

- **Google Analytics 4 Integration**
  - Page views tracking
  - Popular products tracking
  - User interaction tracking
  - Conversion tracking

### Pages

1. **Home** - Use-based browsing with festival banner
2. **Products** - Filterable product catalog
3. **Product Details** - Full product information with Razorpay integration
4. **Compare** - Side-by-side product comparison
5. **Login/Signup** - User authentication
6. **Dashboard** - User profile & order history
7. **Contact** - WhatsApp, phone, and contact form
8. **Admin Dashboard** - Complete store management

## 🛠️ Tech Stack

### Frontend

- **Next.js 14** - React framework
- **Tailwind CSS** - Utility-first CSS
- **Axios** - HTTP client
- **Razorpay** - Payment gateway

### Backend

- **Node.js + Express** - Server runtime & framework
- **MongoDB + Mongoose** - Database & ODM
- **JWT** - Authentication
- **Razorpay SDK** - Payment processing

## 📁 Project Structure

```
electronics_store/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   ├── Order.js
│   │   │   ├── Enquiry.js
│   │   │   └── Settings.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   ├── enquiryRoutes.js
│   │   │   └── settingsRoutes.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   ├── orderController.js
│   │   │   ├── enquiryController.js
│   │   │   └── settingsController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── pages/
│   │   ├── _app.js
│   │   ├── _document.js
│   │   ├── index.js (Home)
│   │   ├── products.js
│   │   ├── products/[id].js
│   │   ├── compare.js
│   │   ├── login.js
│   │   ├── signup.js
│   │   ├── dashboard.js
│   │   ├── contact.js
│   │   └── admin/
│   │       ├── index.js
│   │       └── add-product.js
│   ├── components/
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ProductCard.js
│   ├── utils/
│   │   ├── api.js
│   │   ├── analytics.js
│   │   └── i18n/
│   │       ├── translations.js
│   │       └── context.js
│   ├── styles/
│   │   └── globals.css
│   ├── public/
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.local.example
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (local or cloud)
- Razorpay account (for payment processing)
- Google Analytics 4 account (for analytics)

### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env file**

   ```bash
   cp .env.example .env
   ```

4. **Configure .env**

   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ars_electronics
   JWT_SECRET=your_jwt_secret_key_change_in_production
   JWT_EXPIRY=7d

   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret

   FRONTEND_URL=http://localhost:3000
   ```

5. **Start backend server**
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env.local file**

   ```bash
   cp .env.local.example .env.local
   ```

4. **Configure .env.local**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start frontend development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## 🔐 Authentication & Authorization

### JWT-Based Authentication

- Tokens stored in localStorage
- Auto-included in API requests
- Expires in 7 days (configurable)

### Role-Based Access

- **User** - Browse products, make purchases, view own orders
- **Admin** - Full access to dashboard, product management, orders, settings

### Default Admin Credentials

Create an admin user through signup and manually update role in MongoDB:

```javascript
db.users.updateOne(
  { email: "admin@arselectronics.com" },
  { $set: { role: "admin" } },
);
```

## 💳 Razorpay Integration

### Setup Steps

1. **Get API Keys**
   - Go to [Razorpay Dashboard](https://razorpay.com/)
   - Navigate to Settings → API Keys
   - Copy Key ID and Key Secret

2. **Add to .env**

   ```env
   RAZORPAY_KEY_ID=rzp_live_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```

3. **Payment Flow**
   - User clicks "Buy Now"
   - Order created in database
   - Razorpay checkout opens
   - User enters payment details
   - Payment verified via signature
   - Order status updated to "confirmed"

## 📊 Google Analytics 4 Setup

### Integration Steps

1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create new GA4 property
   - Get Measurement ID (G-XXXXXXXXXX)

2. **Add to Admin Settings**
   - Go to Admin Dashboard → Settings
   - Add Measurement ID
   - Save settings

3. **Tracked Events**
   - `page_view` - Page visits
   - `buy_now_clicked` - Buy button clicks
   - `whatsapp_clicked` - WhatsApp enquiry clicks
   - `view_item` - Product view
   - `add_to_compare` - Compare clicks

## 🌐 Bilingual Support

### Language System

- English (en) - Default
- Tamil (ta) - Localized

### How It Works

- Language preference stored in localStorage
- Context API manages global language state
- All strings in `utils/i18n/translations.js`
- Toggle in header switches languages
- User preference saved to backend

### Adding New Translations

1. Add entry to both `en` and `ta` objects in `translations.js`
2. Use `useI18n()` hook to access `t()` function
3. Example: `t('products.buyNow')`

## 👤 User Features

### Login & Signup

- Email-based authentication
- Password hashing with bcryptjs
- Profile management
- Language preference

### Dashboard

- View profile information
- Order history with status tracking
- Buy Again button for quick repurchasing
- Order tracking

## 🛒 Product Management (Admin)

### CRUD Operations

- Create products with EN/TA names & descriptions
- Upload multiple product images
- Set price and specifications
- Assign use cases
- Mark popular products
- Enable/disable products

### Product Fields

```javascript
{
  name: { en: String, ta: String },
  description: { en: String, ta: String },
  price: Number,
  useCases: [String], // small_families, large_families, energy_saving, premium
  images: [String],
  specifications: Object,
  isPopular: Boolean,
  isEnabled: Boolean
}
```

## 📦 Order Management

### Order Flow

1. **Create Order** - Customer selects product(s) and initiates checkout
2. **Payment** - Razorpay payment processing
3. **Verification** - Signature verification and order confirmation
4. **Admin Update** - Admin can update order status
5. **Fulfillment** - Place → Confirmed → Shipped → Delivered

### Order Statuses

- `placed` - Initial order creation
- `confirmed` - Payment verified
- `shipped` - Order dispatched
- `delivered` - Order received
- `cancelled` - Order cancelled

## 💬 Enquiries

### Types

- WhatsApp enquiry
- Call request
- Email message

### Admin Features

- View all enquiries
- Update enquiry status (pending → contacted → resolved)
- Track customer interactions

## 🎉 Festival Banner Control

Admin can toggle festival greetings:

- Diwali, Pongal, New Year, etc.
- Bilingual banner text
- No discounts required
- Just local celebration messaging

## 🔒 Security Considerations

### Implemented

- JWT authentication
- Password hashing with bcryptjs
- CORS enabled
- Input validation
- Razorpay signature verification
- Role-based access control

### Best Practices

- Change JWT_SECRET in production
- Use environment variables for sensitive data
- Enable HTTPS in production
- Regular database backups
- MongoDB user authentication

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Connect GitHub repo to Vercel
# Set NEXT_PUBLIC_API_URL environment variable
# Vercel handles deployment automatically
```

### Backend (Heroku / AWS / DigitalOcean)

```bash
# Heroku example
heroku create ars-electronics-backend
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set RAZORPAY_KEY_ID=...
heroku config:set RAZORPAY_KEY_SECRET=...
git push heroku main
```

## 📞 Contact & Support

### For Customers

- Phone: +91-9876543210
- WhatsApp: +91-9876543210
- Email: contact@arselectronics.com
- Location: Krishnagiri, Tamil Nadu

### For Developers

- This is a production-ready codebase
- Customize shop details in `/api/settings`
- All texts are bilingual and editable

## 📝 License

MIT License - Open source

## 🎯 Future Enhancements

Potential additions:

- SMS notifications
- Email order confirmations
- Inventory management (optional)
- Review & ratings system
- Wishlist feature
- Advanced analytics
- Mobile app (React Native)
- Live chat support
- Multi-language support (more languages)

## ⚠️ Important Notes

### No Stock Tracking

- This system is designed for a local shop without strict inventory
- Products are always visible to customers
- Actual availability confirmed via call/WhatsApp
- Order management is simplified

### Local Business Focus

- Trust-based messaging emphasizing local presence
- Simple non-technical admin interface
- Focus on customer relationships
- WhatsApp integration for quick communication

---

**Built with ❤️ for ARS Electronics World**

For setup assistance, refer to the detailed sections above.
