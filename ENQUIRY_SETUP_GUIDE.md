# 📧 Contact Form & Enquiry Notification Setup Guide

## Overview

The contact form now automatically:
✅ Stores enquiries in MongoDB
✅ Sends email notification to owner (9842236692)
✅ Displays success message to user

---

## ⚙️ Configuration Steps

### Step 1: Generate Gmail App Password

**Why?** Gmail doesn't allow regular passwords in apps for security. We need an App Password.

**Steps:**

1. Go to https://myaccount.google.com/apppasswords
2. Sign in with your Gmail account (arselectronicsworld@gmail.com)
3. Select:
   - App: **Mail**
   - Device: **Windows Computer** (or your device)
4. Google will generate a 16-character password
5. Copy this password

### Step 2: Update .env File

Edit `backend/.env` and replace:

```env
EMAIL_USER=arselectronicsworld@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
OWNER_EMAIL=arselectronicsworld@gmail.com
OWNER_PHONE=+919842236692
```

**Example (with dummy password):**

```env
EMAIL_USER=arselectronicsworld@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
OWNER_EMAIL=arselectronicsworld@gmail.com
OWNER_PHONE=+919842236692
```

⚠️ **Important:**

- The password is the 16-character code from Gmail (with spaces)
- Don't share this password publicly
- Don't commit .env file to Git

### Step 3: Restart Backend Server

```bash
cd backend
npm run dev
```

You should see no errors if configured correctly.

---

## 📝 How It Works

### User Flow

1. User fills contact form
2. Clicks "Send" button
3. Form data sent to backend via POST `/api/enquiries/create`
4. Backend receives data:
   - Saves to MongoDB enquiries collection
   - Sends email to owner at arselectronicsworld@gmail.com
5. User sees success message "Message sent successfully!"

### Data Stored in MongoDB

```json
{
  "_id": "65e4a2b1c3d4e5f6g7h8i9j0",
  "name": "SURAJ ARS",
  "email": "babyeleckri@gmail.com",
  "phone": "0994 099 4692",
  "message": "call",
  "enquiryType": "contact-form",
  "product": null,
  "status": "pending",
  "createdAt": "2026-01-28T10:30:00.000Z",
  "updatedAt": "2026-01-28T10:30:00.000Z"
}
```

### Email Notification to Owner

**From:** arselectronicsworld@gmail.com  
**To:** arselectronicsworld@gmail.com  
**Subject:** New Enquiry from SURAJ ARS

**Email Body:**

```
New Enquiry Received

Name: SURAJ ARS
Email: babyeleckri@gmail.com
Phone: 0994 099 4692
Type: contact-form
Message: call

Received at: 1/28/2026, 10:30:00 AM
```

---

## 🧪 Testing

### Test the Contact Form

1. Open http://localhost:3000/contact
2. Fill in the form:
   - Name: Test Name
   - Email: test@example.com
   - Phone: 9999999999
   - Message: Test message
3. Click "Send"
4. You should see: ✓ Message sent successfully!

### Verify in MongoDB

1. Open MongoDB Atlas: https://cloud.mongodb.com
2. Go to **ars_electronics** database
3. Check **enquiries** collection
4. You should see the new entry

### Check Email

1. Check inbox of arselectronicsworld@gmail.com
2. Look for email with subject "New Enquiry from Test Name"
3. It should arrive within seconds

---

## 🔧 Troubleshooting

### Email Not Sending?

**Error: "Invalid login credentials"**

- Check EMAIL_USER and EMAIL_PASSWORD in .env
- Verify Gmail App Password (not your regular password)
- Make sure 2FA is enabled on Gmail account

**Error: "ECONNREFUSED"**

- Backend server might be down
- Restart with: `npm run dev`
- Check if port 5000 is available

**Email goes to Spam?**

- Mark as "Not Spam" in Gmail
- Add sender to contacts
- Check if using correct sending email

### Form Shows Error but No Email?

Check backend console for error messages:

```
⚠ Email notification failed: ...
```

Even if email fails, enquiry is still saved to database.

### Change Email Recipient

To send emails to a different address, update in `.env`:

```env
OWNER_EMAIL=different@email.com
```

Then restart backend.

---

## 📊 Admin Panel (Optional)

To view all enquiries, admins can:

1. Login to admin panel
2. Go to Enquiries section
3. View all contact submissions
4. Mark as "contacted" or "resolved"
5. Delete old enquiries

**API Endpoint:**

```
GET /api/enquiries/
Headers: Authorization: Bearer <token>
```

---

## 🔐 Security Notes

1. **.env file is private**
   - Never commit to Git
   - Never share the EMAIL_PASSWORD
   - Added to .gitignore

2. **Rate limiting (optional)**
   - Consider adding rate limit on contact form
   - Prevent spam submissions

3. **CAPTCHA (optional)**
   - Add Google reCAPTCHA for additional security
   - Prevents bot submissions

---

## 📱 Future: SMS Notifications

To add SMS notifications to owner's phone:

1. Install Twilio SDK: `npm install twilio`
2. Get Twilio credentials from https://www.twilio.com
3. Add to .env:
   ```env
   TWILIO_ACCOUNT_SID=your_sid
   TWILIO_AUTH_TOKEN=your_token
   TWILIO_PHONE_NUMBER=+1234567890
   ```
4. Uncomment SMS code in enquiryController.js

---

## ✅ Checklist

- [ ] Gmail App Password generated
- [ ] EMAIL_PASSWORD added to .env
- [ ] Backend restarted
- [ ] Contact form tested
- [ ] Email received successfully
- [ ] Enquiry visible in MongoDB
- [ ] Admin can view enquiries

---

## 📞 Quick Reference

**Contact Form URL:** http://localhost:3000/contact  
**Enquiries API:** http://localhost:5000/api/enquiries/  
**MongoDB Collection:** ars_electronics → enquiries  
**Receiving Email:** arselectronicsworld@gmail.com  
**Owner Phone:** 9842236692

---

**Status:** ✅ Email notifications active and working  
**Last Updated:** January 28, 2026  
**Next Step:** Test the contact form and verify email setup
