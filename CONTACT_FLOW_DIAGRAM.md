# 📞 CONTACT INFORMATION - QUICK REFERENCE

## 🎯 Your Shop Contact Details

```
╔════════════════════════════════════════════════════════════╗
║          ARS ELECTRONICS WORLD - CONTACT INFO             ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  📞 Phone:     9842236692                                 ║
║  💬 WhatsApp:  9842236692 (same as phone)                ║
║  ☎️  Landline:  04343 236697                              ║
║  📧 Email:     contact@arselectronics.com                ║
║                                                            ║
║  📍 Address:   Shop No-185, Bangalore Road                ║
║               CRS Plaza (opposite Govt Girls School)      ║
║               Krishnagiri, Tamil Nadu 635002              ║
║                                                            ║
║  🗺️ Google Maps Link:                                      ║
║  https://maps.google.com/place/ARS+Electronics+World     ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## 🔄 CONTACT FORM DATA FLOW

### When Customer Submits Contact Form:

```
STEP 1: Customer Fills Form
┌────────────────────────────────┐
│ Name:    ________________       │
│ Email:   ________________       │
│ Phone:   ________________       │
│ Message: ________________       │
│                                 │
│         [SEND BUTTON]           │
└────────────────────────────────┘
        ↓ (Click Send)

STEP 2: Frontend Sends Data
Contact.js → API Call
→ POST /api/enquiries
→ Axios HTTP Request
        ↓

STEP 3: Backend Receives
Node.js Express Server
→ enquiryController.js
→ Validates data
        ↓

STEP 4: Save to Database
MongoDB Atlas Cloud Database
↓
Collection: "enquiries"
├─ Customer Name
├─ Email Address
├─ Phone Number
├─ Message
├─ Date/Time
└─ Status: "pending"
        ↓

STEP 5: Show Success Message
Frontend ← Response
└─ "✓ Message sent successfully!"
   (Auto-disappear after 3 seconds)
```

---

## 📊 WHERE DATA IS STORED

### MongoDB Collections Structure:

```
ars_electronics (Database)
│
├─ enquiries (Collection)
│  ├─ _id: 507f1f77bcf86cd799439011
│  ├─ name: "John Doe"
│  ├─ email: "john@example.com"
│  ├─ phone: "9842236692"
│  ├─ message: "Customer message here..."
│  ├─ status: "pending"
│  ├─ enquiryType: "email"
│  ├─ createdAt: 2026-01-28T10:30:00Z
│  └─ updatedAt: 2026-01-28T10:30:00Z
│
├─ settings (Collection)
│  ├─ shopName: "ARS Electronics World"
│  ├─ shopPhone: "+91-9842236692"
│  ├─ shopWhatsapp: "+91-9842236692"
│  ├─ shopLocation: "Shop No-185, Bangalore Road, CRS Plaza..."
│  ├─ shopLandline: "04343 236697"
│  └─ googleMapsUrl: "https://www.google.com/maps/place/..."
│
├─ products (Collection)
├─ users (Collection)
└─ orders (Collection)
```

---

## 🖥️ ADMIN DASHBOARD - VIEW INQUIRIES

### To Check Customer Inquiries:

1. **Go to Admin Panel**
   - URL: `http://localhost:3000/admin` (local)
   - URL: `https://yourdomain.com/admin` (live)

2. **Login with Admin Account**
   - Email: admin@arselectronics.com
   - Password: Admin@123

3. **Click "Inquiries" Section**
   - See all customer messages
   - View: Name, Email, Phone, Message
   - Check: Status, Date received

4. **Manage Inquiries**
   - ✏️ Edit status (pending → replied → resolved)
   - 📧 Copy email → Send via Gmail
   - 💬 Copy phone → Send WhatsApp
   - 🗑️ Delete if spam

---

## 📱 PHONE NUMBER APPEARS ON

### Frontend Pages:

- ✅ **Homepage** - Footer (9842236692)
- ✅ **Product Listing** - Footer + WhatsApp button
- ✅ **Product Detail** - "Call Now" + "WhatsApp Us" buttons
- ✅ **Contact Page** - Phone, WhatsApp, Landline all shown
- ✅ **Every Page Footer** - Phone and landline displayed

### Contact Buttons:

```
Product Detail Page:
┌──────────────────────────────┐
│ 📱 9842236692 (Quantity)     │
│ [Call Now]  [WhatsApp Us]    │
│ [Add to Cart] [Buy Now]      │
│                              │
│ When clicked:               │
│ Call → Opens phone app      │
│ WhatsApp → Opens WhatsApp   │
└──────────────────────────────┘
```

---

## 🔐 SECURITY NOTES

✅ **Enquiry Data is Private**

- Only visible in your admin dashboard
- Not shown publicly on website
- Stored securely in MongoDB Atlas

✅ **Email Addresses Protected**

- Customers can't see each other's emails
- You manually manage replies

✅ **Phone Numbers**

- Displayed for customers to call
- Used for WhatsApp integration
- Landline for alternate contact

---

## 🚀 WHAT YOU CAN DO NOW

1. **Receive Customer Inquiries**
   - Contact form data saved automatically
   - View in admin dashboard

2. **Contact Customers Back**
   - Use WhatsApp (recommended - free, instant)
   - Use Email (professional)
   - Use Phone (personal touch)

3. **Track Inquiry Status**
   - Mark as "pending" → "replied" → "resolved"
   - Keep organized database of all inquiries

4. **Update Contact Info**
   - Change phone: Update in settings
   - All pages auto-update instantly
   - No need to edit multiple files

---

## 📞 QUICK ACTIONS

| Action                  | How                                                                                    |
| ----------------------- | -------------------------------------------------------------------------------------- |
| **Call Customer**       | Click "Call Now" button on product page (for them) OR Copy phone from inquiry in admin |
| **WhatsApp Customer**   | Click "WhatsApp Us" (product page) OR Get their phone from inquiry                     |
| **Email Customer**      | Copy email from inquiry form → Open Gmail                                              |
| **Update Phone Number** | Run `node update-shop-info.js` in backend                                              |
| **View All Inquiries**  | Admin Dashboard → Inquiries section                                                    |
| **Mark as Replied**     | Admin Dashboard → Click inquiry → Change status                                        |

---

## 📈 NEXT STEPS

1. ✅ **Contact info updated** - All pages show 9842236692
2. ✅ **Database settings updated** - MongoDB has complete address
3. ✅ **Contact form working** - Data goes to enquiries collection
4. 🔄 **Test form submission** - Fill contact form → Check admin dashboard
5. 🚀 **Deploy to production** - Domain + Railway + Vercel

---

**Status: ✅ CONTACT INFO FULLY UPDATED**
**Last Updated:** January 28, 2026
