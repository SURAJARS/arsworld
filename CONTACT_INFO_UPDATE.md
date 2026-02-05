# 📞 ARS Electronics World - Contact Information Update

## ✅ What Was Updated

### Frontend Changes

- ✅ **Product Detail Page** - Updated WhatsApp & Call buttons with new phone: **9842236692**
- ✅ **Footer Component** - Updated all pages with new contact info
- ✅ **Contact Page** - Updated WhatsApp handler with new number

### Backend Changes

- ✅ **MongoDB Settings** - Updated shop details:
  - Phone: **+91-9842236692**
  - WhatsApp: **+91-9842236692**
  - Landline: **04343 236697**
  - Address: **Shop No-185, Bangalore Road, CRS Plaza, opposite Govt Girls School, Krishnagiri, Tamil Nadu 635002**
  - Google Maps Link: https://www.google.com/maps/place/ARS+Electronics+World/@12.5236959,78.2170679,15z/

---

## 📋 Contact Form Flow - Where Data Goes

### When User Clicks "Send" on Contact Page:

```
Frontend (contact.js)
        ↓
formData = { name, email, phone, message }
        ↓
enquiryAPI.create(formData) [axios POST request]
        ↓
Backend API Endpoint: POST /api/enquiries
        ↓
enquiryController.createEnquiry()
        ↓
Enquiry Model saves to MongoDB
        ↓
MongoDB Collection: enquiries
        ↓
Success Response sent to Frontend
        ↓
User sees: "✓ Message sent successfully!"
```

### Data Saved in MongoDB:

**Collection:** `enquiries`
**Fields stored:**

- `name` - Customer name
- `email` - Customer email
- `phone` - Customer phone number
- `message` - Inquiry message
- `enquiryType` - Type ("email" from contact form)
- `productId` - null (unless from product page)
- `status` - Default: "pending"
- `createdAt` - Timestamp
- `updatedAt` - Timestamp

### Admin Can View Inquiries:

1. Login at: `http://yourdomain.com/login`
2. Go to: Admin Dashboard → Inquiries
3. See all customer inquiries with:
   - Customer details (name, email, phone)
   - Message content
   - Status (pending/replied/resolved)
   - Date received

### To Reply to Inquiries:

You can:

1. **Manual WhatsApp** - Click customer phone → Send WhatsApp
2. **Manual Email** - Copy email → Send via Gmail
3. **Mark as Replied** - Update status in admin dashboard
4. **Delete** - Remove if spam

---

## 🎯 Current Contact Details

| Item               | Value                                                                                                                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 📞 **Phone**       | 9842236692                                                                                                                                                                             |
| 💬 **WhatsApp**    | 9842236692                                                                                                                                                                             |
| ☎️ **Landline**    | 04343 236697                                                                                                                                                                           |
| 📍 **Address**     | Shop No-185, Bangalore Road, CRS Plaza, opposite Govt Girls School, Krishnagiri, Tamil Nadu 635002                                                                                     |
| 📧 **Email**       | contact@arselectronics.com                                                                                                                                                             |
| 🗺️ **Google Maps** | [View on Maps](https://www.google.com/maps/place/ARS+Electronics+World/@12.5236959,78.2170679,15z/data=!4m6!3m5!1s0x3bac34bdbac33809:0x6b38fdaf26918312!8m2!3d12.5236959!4d78.2170679) |

---

## 📱 Where Phone Numbers Appear

| Page                 | Phone Display          | WhatsApp Link           |
| -------------------- | ---------------------- | ----------------------- |
| **All Pages Footer** | ✅ Shows in footer     | ✅ WhatsApp button      |
| **Product Detail**   | ✅ "Call Now" button   | ✅ "WhatsApp Us" button |
| **Contact Page**     | ✅ Clickable tel: link | ✅ WhatsApp button      |
| **Admin Dashboard**  | N/A                    | Seen in inquiries       |

---

## 🔗 Contact Form API Details

**Endpoint:** `POST /api/enquiries`

**Request Body:**

```json
{
  "productId": null,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9842236692",
  "message": "Can you deliver to my area?",
  "enquiryType": "email"
}
```

**Response (Success):**

```json
{
  "message": "Enquiry created successfully",
  "enquiry": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9842236692",
    "message": "Can you deliver to my area?",
    "status": "pending",
    "enquiryType": "email",
    "productId": null,
    "createdAt": "2026-01-28T10:30:00Z"
  }
}
```

---

## 💡 How to Update Contact Info in Future

### Option 1: Edit in Admin Dashboard (GUI)

1. Login at `/login`
2. Go to Settings
3. Update shop phone, WhatsApp, address, Google Maps
4. Save
   ✅ Everything updates automatically across all pages

### Option 2: Update via Database Script

Run this script from backend folder:

```bash
node update-shop-info.js
```

### Option 3: Manual Database Edit

Edit MongoDB Atlas directly:

1. Go to MongoDB Atlas Dashboard
2. Collections → ars_electronics → settings
3. Edit the settings document
4. Update: shopPhone, shopWhatsapp, shopLocation, googleMapsUrl

---

## ✨ Summary

**Frontend:** ✅ All phone numbers updated to 9842236692 across product pages and footer

**Backend:** ✅ MongoDB settings updated with complete address and Google Maps link

**Contact Form:** ✅ Data flows to MongoDB enquiries collection, viewable in admin dashboard

**Next Step:** You can now receive customer inquiries and reply via WhatsApp or email! 🚀
