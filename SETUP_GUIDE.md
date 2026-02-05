# ARS Electronics World - Setup Guide

## Quick Start (2 minutes)

### Prerequisites

1. **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** (local or cloud)
3. **Razorpay Account** - [Sign up](https://razorpay.com/)
4. **Git** - [Download](https://git-scm.com/)

### Step 1: Clone & Navigate

```bash
cd electronics_store
```

### Step 2: Setup Backend

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file (already provided)
# Edit .env with your credentials:
# - MongoDB URI
# - Razorpay keys
# - JWT secret

# Start backend server
npm run dev
```

✅ Backend running on `http://localhost:5000`

### Step 3: Setup Frontend

```bash
# In a new terminal, navigate to frontend
cd frontend

# Install dependencies
npm install

# Start frontend dev server
npm run dev
```

✅ Frontend running on `http://localhost:3000`

### Step 4: Access the Application

- **Customer Site**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin

---

## Detailed Setup Instructions

### MongoDB Setup

#### Option A: Local MongoDB (Windows/Mac/Linux)

1. [Download MongoDB Community](https://www.mongodb.com/try/download/community)
2. Install and run
3. Verify: Open terminal and run `mongosh`

#### Option B: MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create a cluster
4. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/ars_electronics`
5. Update `MONGODB_URI` in `.env`

---

### Razorpay Setup

1. **Create Account**
   - Go to [Razorpay Dashboard](https://razorpay.com/)
   - Sign up with email

2. **Get API Keys**
   - Click Settings → API Keys
   - Copy "Key ID" and "Key Secret"
   - Use Test keys for development

3. **Add to Backend .env**

   ```env
   RAZORPAY_KEY_ID=rzp_test_xxxxx
   RAZORPAY_KEY_SECRET=xxxxx
   ```

4. **Test Payment**
   - Use test card: `4111 1111 1111 1111`
   - Any future date for expiry
   - Any CVV

---

### Google Analytics 4 Setup

1. **Create GA4 Property**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Click "Create Property"
   - Fill in website details
   - Get Measurement ID (format: G-XXXXXXXXXX)

2. **Add to Admin Dashboard**
   - Go to http://localhost:3000/admin
   - Navigate to Settings
   - Paste Measurement ID
   - Save

3. **Verify Tracking**
   - Visit your site
   - Check GA4 Real-Time reports

---

### Admin User Setup

1. **Create Account**
   - Visit http://localhost:3000/signup
   - Sign up with email/password

2. **Grant Admin Rights**
   - Open MongoDB client (mongosh)

   ```javascript
   use ars_electronics
   db.users.updateOne(
     { email: "your_email@example.com" },
     { $set: { role: "admin" } }
   )
   ```

3. **Access Admin Dashboard**
   - http://localhost:3000/admin

---

### Environment Variables Checklist

#### Backend (.env)

- [ ] MONGODB_URI - Your MongoDB connection string
- [ ] JWT_SECRET - Random secret key (min 20 chars)
- [ ] RAZORPAY_KEY_ID - From Razorpay dashboard
- [ ] RAZORPAY_KEY_SECRET - From Razorpay dashboard
- [ ] FRONTEND_URL - http://localhost:3000 (for development)

#### Frontend (.env.local)

- [ ] NEXT_PUBLIC_API_URL - http://localhost:5000/api

---

## Verify Everything Works

### Checklist

1. ✅ Backend server running

   ```bash
   curl http://localhost:5000/api/health
   # Should return: {"message":"Server is running"}
   ```

2. ✅ Frontend loading
   - Open http://localhost:3000
   - See home page with products

3. ✅ MongoDB connected
   - Check backend console for: "MongoDB connected"

4. ✅ Authentication works
   - Go to /signup
   - Create account
   - Verify user in MongoDB

5. ✅ Admin dashboard accessible
   - After making yourself admin
   - Go to /admin
   - See dashboard with products, orders, etc.

6. ✅ Razorpay integration ready
   - Go to product
   - Click "Buy Now"
   - Razorpay modal should open

---

## Common Issues & Solutions

### Issue: "MongoDB connection error"

**Solution:**

- Ensure MongoDB is running: `mongosh`
- Check MONGODB_URI in .env
- If using Atlas, verify IP whitelist includes your IP

### Issue: "Cannot GET /api/products"

**Solution:**

- Backend not running
- Check backend is on port 5000
- Verify CORS configuration

### Issue: "Payment gateway not working"

**Solution:**

- Check RAZORPAY_KEY_ID and SECRET are correct
- Verify test keys (not live)
- Check for typos

### Issue: "Language toggle not working"

**Solution:**

- Clear browser localStorage
- Refresh page
- Check I18nProvider in \_app.js is loaded

### Issue: "Admin dashboard showing nothing"

**Solution:**

- Verify user role is set to "admin" in MongoDB
- Check JWT token is valid
- Refresh page

---

## Adding Sample Products

To add sample products for testing:

```javascript
// In MongoDB shell
use ars_electronics

db.products.insertMany([
  {
    name: { en: "55 inch Smart TV", ta: "55 இஞ்ச் ஸ்மார்ட் டிவி" },
    description: {
      en: "Latest 4K Smart TV with AI upscaling",
      ta: "AI அப்ஸ்கேலிங் கொண்ட சமீபத்திய 4K ஸ்மார்ட் டிவி"
    },
    price: 35000,
    useCases: ["large_families", "premium"],
    images: ["https://via.placeholder.com/400x300?text=TV"],
    isPopular: true,
    isEnabled: true
  },
  {
    name: { en: "Refrigerator 300L", ta: "குளிர்சாதன பெட்டி 300L" },
    description: {
      en: "Energy efficient frost-free refrigerator",
      ta: "ஆற்றல் திறனான நிறுப்பு இல்லாத குளிர்சாதன பெட்டி"
    },
    price: 28000,
    useCases: ["large_families", "energy_saving"],
    images: ["https://via.placeholder.com/400x300?text=Refrigerator"],
    isPopular: true,
    isEnabled: true
  }
])
```

---

## Production Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Connect repo to Vercel
3. Set environment variable: `NEXT_PUBLIC_API_URL=https://your-backend.com`
4. Deploy (automatic on push)

### Backend (Heroku/Railway/Render)

1. Set environment variables on platform
2. Deploy with `npm start`
3. Get deployed URL
4. Update frontend `NEXT_PUBLIC_API_URL`

### Database (MongoDB Atlas)

1. Already in cloud - no setup needed
2. Whitelist production IP address

### Razorpay (Production Keys)

1. Generate production keys in Razorpay dashboard
2. Update in backend .env
3. Remove test card numbers from documentation

---

## Useful Commands

```bash
# Backend
npm run dev          # Start development server
npm start            # Start production server
npm test             # Run tests (when added)

# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check code quality

# MongoDB
mongosh              # Connect to MongoDB
use ars_electronics  # Switch database
db.users.find()      # List users
db.products.find()   # List products
```

---

## Support & Documentation

- **GitHub Issues**: Report bugs
- **Razorpay Docs**: https://razorpay.com/docs/
- **Next.js Docs**: https://nextjs.org/docs
- **MongoDB Docs**: https://docs.mongodb.com/

---

**Setup Complete! 🎉**

Your ARS Electronics World store is ready to use.
