# ARS Electronics World - Initial Data Setup

This guide helps you populate your database with initial data for testing and demonstration.

## Products to Add

Below are sample products with bilingual content that you can add to your store.

### Sample Product 1: Smart TV

```json
{
  "name": {
    "en": "55 inch 4K Smart TV with AI Upscaling",
    "ta": "AI அப்ஸ்கேலிங் கொண்ட 55 இஞ்ச் 4K ஸ்மார்ட் டிவி"
  },
  "description": {
    "en": "Latest 55 inch 4K Smart TV with AI upscaling, HDR support, and smart apps built-in",
    "ta": "AI அப்ஸ்கேலிங், HDR ஆதரவு மற்றும் உள்ளமைக்கப்பட்ட ஸ்மார்ட் பயன்பாடுகளுடன் சமீபத்திய 55 இஞ்ச் 4K ஸ்மார்ட் டிவி"
  },
  "price": 35000,
  "useCases": ["large_families", "premium"],
  "images": ["https://via.placeholder.com/500x400?text=Smart+TV"],
  "specifications": {
    "Screen Size": "55 inch",
    "Resolution": "4K (3840 x 2160)",
    "Refresh Rate": "60 Hz",
    "Brightness": "400 nits"
  },
  "isPopular": true,
  "isEnabled": true
}
```

### Sample Product 2: Refrigerator

```json
{
  "name": {
    "en": "300L Frost-Free Refrigerator",
    "ta": "300L நிறுப்பு இல்லாத குளிர்சாதன பெட்டி"
  },
  "description": {
    "en": "Energy efficient frost-free refrigerator with inverter technology. Perfect for large families.",
    "ta": "ইনভার্টার প্রযুক্তি সহ শক্তি সাশ্রয়ী নিষ্ফ্রস্ট রেফ্রিজারেটর। বড় পরিবারের জন্য নিখুঁত।"
  },
  "price": 28000,
  "useCases": ["large_families", "energy_saving"],
  "images": ["https://via.placeholder.com/500x400?text=Refrigerator"],
  "specifications": {
    "Capacity": "300L",
    "Type": "Frost-Free",
    "Energy Rating": "5 Star",
    "Compressor": "Inverter"
  },
  "isPopular": true,
  "isEnabled": true
}
```

### Sample Product 3: Microwave Oven

```json
{
  "name": {
    "en": "25L Convection Microwave",
    "ta": "25L கன்வெக்शன் மைக்ரோவேவ்"
  },
  "description": {
    "en": "25L convection microwave with auto-cook menus and digital display. Great for quick cooking.",
    "ta": "தானியங்கி சமைக்கும் மெனு மற்றும் ডিজিটல் ডিসপ্লে கொண்ட 25L கன்வெக்شন் மைக்ரோவেവ்। விரைவான சமைக்கலுக்கு நிখুதம்।"
  },
  "price": 12000,
  "useCases": ["small_families", "energy_saving"],
  "images": ["https://via.placeholder.com/500x400?text=Microwave"],
  "specifications": {
    "Capacity": "25L",
    "Wattage": "900W",
    "Type": "Convection",
    "Auto Cook": "Yes"
  },
  "isPopular": false,
  "isEnabled": true
}
```

### Sample Product 4: Mixer Grinder

```json
{
  "name": {
    "en": "1000W Premium Mixer Grinder",
    "ta": "1000W பிரீமியம் மிக்சர் கிரைண்டர்"
  },
  "description": {
    "en": "Powerful 1000W mixer grinder with 3 jars for grinding, mixing, and juicing. Durable and efficient.",
    "ta": "அரைக்க, கலக்க மற்றும் சாற்றை மாற்றுவதற்கு 3 சாடிகளுடன் சக்திவாய்ந்த 1000W மிக்சர் கிரைண்டர்। நீடித்த மற்றும் திறனுள்ளது।"
  },
  "price": 4500,
  "useCases": ["small_families", "large_families"],
  "images": ["https://via.placeholder.com/500x400?text=Mixer+Grinder"],
  "specifications": {
    "Power": "1000W",
    "Jars": "3",
    "Warranty": "2 Years"
  },
  "isPopular": true,
  "isEnabled": true
}
```

### Sample Product 5: Washing Machine

```json
{
  "name": {
    "en": "7kg Automatic Washing Machine",
    "ta": "7kg தானியங்கி சலவை இயந்திரம்"
  },
  "description": {
    "en": "Fully automatic 7kg washing machine with multiple wash cycles and inverter motor. Energy efficient and silent.",
    "ta": "பல சலவைத் திறன் மற்றும் ইনভெर्টर் மোட்டர் கொண்ட முழு தானியங்கி 7kg சலவை இயந்திரம்। শக்தি சிக்கனப்பு மற்றும் மிகுசप்ப்ல்।"
  },
  "price": 25000,
  "useCases": ["large_families"],
  "images": ["https://via.placeholder.com/500x400?text=Washing+Machine"],
  "specifications": {
    "Capacity": "7kg",
    "Type": "Fully Automatic",
    "Energy Rating": "5 Star",
    "Motor": "Inverter"
  },
  "isPopular": false,
  "isEnabled": true
}
```

## How to Add Products

### Method 1: Via MongoDB Shell (Easiest)

1. Open MongoDB shell:

   ```bash
   mongosh
   ```

2. Switch to database:

   ```bash
   use ars_electronics
   ```

3. Insert sample products:
   ```javascript
   db.products.insertMany([
     // Paste sample products JSON here
   ]);
   ```

### Method 2: Via Admin Dashboard

1. Start your application
2. Create admin user (see SETUP_GUIDE.md)
3. Go to `/admin`
4. Click "Add Product"
5. Fill in form with bilingual content
6. Click "Create Product"

### Method 3: Via API (cURL)

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "name": {"en": "Product Name", "ta": "பொருட்டின் பெயர்"},
    "description": {"en": "Description", "ta": "விவரணை"},
    "price": 15000,
    "useCases": ["large_families"],
    "images": ["https://image.jpg"],
    "isPopular": false,
    "isEnabled": true
  }'
```

## Sample Settings

Add these settings for your store:

```javascript
db.settings.insertOne({
  festivalBannerEnabled: false,
  festivalBannerText: {
    en: "Celebrate Pongal with us! Special offers on all appliances",
    ta: "பொங்கல் விழாவை எங்களுடன் கொண்டாடவும்! அனைத்து சாதனங்களிலும் சிறப்பு சலுகைகள்",
  },
  shopPhone: "+91-9876543210",
  shopWhatsapp: "+91-9876543210",
  shopLocation: "Krishnagiri, Tamil Nadu",
  googleAnalyticsId: "G-XXXXXXXXXX",
});
```

## Testing

After adding products:

1. Go to http://localhost:3000
2. See products on home page
3. Filter by use-case
4. Try comparison feature
5. Test bilingual support (toggle language)

---

## Product Categories (Use Cases)

- **small_families** - For 1-2 person households
- **large_families** - For 5+ person households
- **energy_saving** - Eco-friendly, low power consumption
- **premium** - High-end, luxury appliances

---

**Tip**: Use placeholder images (https://via.placeholder.com) for testing, then replace with actual product images later.
