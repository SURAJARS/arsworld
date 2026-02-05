# ARS Electronics World - Quick Reference Card

## � LATEST UPDATE (January 28, 2026)

### ✅ Contact Information Updated

- **Phone:** 9842236692 (updated on all pages)
- **WhatsApp:** 9842236692 (integration active)
- **Landline:** 04343 236697 (displayed in footer)
- **Address:** Shop No-185, Bangalore Road, CRS Plaza, Krishnagiri, TN 635002
- **Email:** contact@arselectronics.com
- **Google Maps:** [View Location](https://www.google.com/maps/place/ARS+Electronics+World/@12.5236959,78.2170679)

**Contact Form Status:** ✅ Working - Data saves to MongoDB
**Admin Dashboard:** ✅ Can view all customer inquiries at /admin

---

## �🚀 Getting Started (30 seconds)

### Prerequisites Check

- [ ] Node.js installed (`node -v`)
- [ ] MongoDB running (`mongosh`)
- [ ] Git installed

### Three Simple Steps

**Step 1: Backend (Terminal 1)**

```bash
cd backend
npm install
npm run dev
```

✅ Runs on `http://localhost:5000`

**Step 2: Frontend (Terminal 2)**

```bash
cd frontend
npm install
npm run dev
```

✅ Runs on `http://localhost:3000`

**Step 3: Open Browser**

- http://localhost:3000 → Customer site
- http://localhost:3000/admin → Admin panel

---

## 📝 Configuration Files

### Backend .env (Already Created)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ars_electronics
JWT_SECRET=your_super_secret_jwt_key_change_in_production_12345
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_KEY_SECRET=xxxxx
FRONTEND_URL=http://localhost:3000
```

### Frontend .env.local (Already Created)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 👥 User Roles

### Customer

- Browse products
- Search & filter
- View details
- Make purchases
- Track orders
- Manage profile

### Admin

- All customer features
- Add/Edit/Delete products
- Manage orders
- View enquiries
- Control settings
- Festival banner

---

## 🌐 Key URLs

| Page           | URL                                     |
| -------------- | --------------------------------------- |
| Home           | http://localhost:3000                   |
| Products       | http://localhost:3000/products          |
| Product Detail | http://localhost:3000/products/[id]     |
| Compare        | http://localhost:3000/compare           |
| Login          | http://localhost:3000/login             |
| Signup         | http://localhost:3000/signup            |
| Dashboard      | http://localhost:3000/dashboard         |
| Contact        | http://localhost:3000/contact           |
| Admin          | http://localhost:3000/admin             |
| Add Product    | http://localhost:3000/admin/add-product |

---

## 🔌 API Base URL

```
http://localhost:5000/api
```

### Key Endpoints

**Public:**

- GET `/products` - List products
- GET `/products/:id` - Product details
- POST `/auth/register` - Sign up
- POST `/auth/login` - Log in

**Protected:**

- GET `/auth/profile` - User profile
- GET `/orders/my-orders` - My orders
- POST `/orders/create` - Create order

**Admin Only:**

- POST `/products` - Create product
- PUT `/products/:id` - Edit product
- DELETE `/products/:id` - Delete product
- GET `/orders/all-orders` - All orders
- PUT `/orders/:id/status` - Update order status

---

## 💼 Database Collections

```javascript
// Users
db.users.find();

// Products
db.products.find();

// Orders
db.orders.find();

// Enquiries
db.enquiries.find();

// Settings
db.settings.findOne();
```

### Create Admin

```javascript
db.users.updateOne(
  { email: "your_email@example.com" },
  { $set: { role: "admin" } },
);
```

---

## 🎨 Frontend Features

| Feature              | Status |
| -------------------- | ------ |
| Bilingual (EN/TA)    | ✅     |
| Product Categories   | ✅     |
| Search & Filter      | ✅     |
| Product Comparison   | ✅     |
| User Auth            | ✅     |
| Shopping & Checkout  | ✅     |
| Order History        | ✅     |
| Admin Dashboard      | ✅     |
| WhatsApp Integration | ✅     |
| Google Analytics     | ✅     |
| Responsive Design    | ✅     |

---

## 📦 Backend Features

| Feature              | Status |
| -------------------- | ------ |
| User Management      | ✅     |
| JWT Authentication   | ✅     |
| Product CRUD         | ✅     |
| Order Processing     | ✅     |
| Razorpay Integration | ✅     |
| Enquiry Management   | ✅     |
| Settings Management  | ✅     |
| Role-Based Access    | ✅     |

---

## 🛠️ Common Commands

```bash
# Backend
npm run dev          # Start dev server
npm start            # Start production

# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production

# Both simultaneously (with concurrently)
npm run dev          # From root

# MongoDB
mongosh              # Connect to MongoDB
use ars_electronics  # Switch database
show collections     # List tables
db.products.count()  # Count products
```

---

## 🧪 Test User

### Sign Up First

1. Go to http://localhost:3000/signup
2. Create account with any details
3. Password must be 6+ characters

### Make Admin

```javascript
mongosh
use ars_electronics
db.users.updateOne({email: "your@email.com"}, {$set: {role: "admin"}})
```

### Test Credentials (After Creating)

- Email: your@email.com
- Password: (what you created)

---

## 💳 Razorpay Test

**Test Card:**

- Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits

---

## 🌐 Bilingual System

### How It Works

- Click language toggle in header (EN/TA)
- Choice saved to localStorage
- All UI switches instantly

### Add Translations

1. Edit `frontend/utils/i18n/translations.js`
2. Add key to both `en` and `ta` objects
3. Use `t('key.path')` in components

### Example

```javascript
// translations.js
en: { products: { title: "Products" } }
ta: { products: { title: "பொருட்கள்" } }

// In component
const { t } = useI18n()
<h1>{t('products.title')}</h1>
```

---

## 📊 Admin Checklist

- [ ] Create your account (/signup)
- [ ] Make yourself admin (MongoDB)
- [ ] Visit /admin dashboard
- [ ] Add sample products
- [ ] Set shop details (Settings)
- [ ] Enable festival banner (optional)
- [ ] Add Google Analytics ID (optional)
- [ ] Test product creation
- [ ] Test order flow

---

## 🔍 Troubleshooting

### Backend Won't Start

```bash
# Check Node version
node -v

# Check port 5000 is free
lsof -i :5000

# Clear cache
rm -rf node_modules
npm install
```

### Frontend Won't Load

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall
npm install
npm run dev
```

### Database Connection Error

```bash
# Start MongoDB
mongosh

# Check connection string in .env
# Default: mongodb://localhost:27017/ars_electronics
```

### Razorpay Not Working

```bash
# Verify keys in .env
RAZORPAY_KEY_ID=rzp_test_xxxxx  ← starts with rzp_test
RAZORPAY_KEY_SECRET=xxxxx        ← long secret string
```

---

## 📱 Responsive Breakpoints

| Device  | Width          |
| ------- | -------------- |
| Mobile  | < 768px        |
| Tablet  | 768px - 1024px |
| Desktop | > 1024px       |

All pages work perfectly on all sizes!

---

## 🎯 What's Next?

### For Learning

- Explore code structure
- Read API documentation
- Modify translations
- Add new features

### For Deployment

- See SETUP_GUIDE.md (Production section)
- Deploy frontend to Vercel
- Deploy backend to Heroku/Railway
- Connect to MongoDB Atlas

### For Customization

- Update shop details in Admin → Settings
- Add your logo/images
- Modify color scheme (tailwind.config.js)
- Add more languages
- Customize products

---

## 📞 Help

### Documentation Files

1. **README.md** - Project overview
2. **SETUP_GUIDE.md** - Detailed setup
3. **API_DOCUMENTATION.md** - API reference
4. **INITIAL_DATA.md** - Sample data
5. **PROJECT_SUMMARY.md** - Feature checklist

### Common Issues

- See SETUP_GUIDE.md → Common Issues & Solutions

---

## ✨ Key Highlights

🎯 **Production Ready**

- Clean code
- Security implemented
- Error handling
- Validation

🌍 **Bilingual**

- English + Tamil
- Easy to add more languages

💳 **Payment Ready**

- Razorpay integrated
- Secure verification

📊 **Analytics Ready**

- Google Analytics 4 support
- Track user behavior

👥 **User Friendly**

- Simple admin interface
- Customer-focused design
- Mobile optimized

---

**Built for ARS Electronics World**  
**Modern. Secure. Scalable.**

Version 1.0.0 | January 2024
