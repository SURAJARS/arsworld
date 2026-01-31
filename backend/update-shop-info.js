#!/usr/bin/env node

const mongoose = require('mongoose');

// Use MongoDB Atlas connection string
const uri = 'mongodb+srv://ars_admin:Admin%40123@arsworld.ufcsjee.mongodb.net/ars_electronics?retryWrites=true&w=majority';

const shopSettings = {
  shopName: 'ARS Electronics World',
  shopPhone: '+91-9842236692',
  shopWhatsapp: '+91-9842236692',
  shopLocation: 'Shop No-185, Bangalore Road, CRS Plaza, opposite Govt Girls School, Krishnagiri, Tamil Nadu 635002',
  shopLandline: '04343 236697',
  googleMapsUrl: 'https://www.google.com/maps/place/ARS+Electronics+World/@12.5236959,78.2170679,15z/data=!4m6!3m5!1s0x3bac34bdbac33809:0x6b38fdaf26918312!8m2!3d12.5236959!4d78.2170679!16s%2Fg%2F124yhk_m6?entry=ttu&g_ep=EgoyMDI2MDEyNi4wIKXMDSoASAFQAw%3D%3D',
  // Google Maps embed (optional - can add later)
  googleMapsEmbed: ''
};

async function updateShopSettings() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas');
    
    const db = mongoose.connection.db;
    
    // Update or create settings
    const result = await db.collection('settings').updateOne(
      {},
      { 
        $set: shopSettings
      },
      { upsert: true }
    );
    
    console.log(`\n✅ Shop settings updated successfully!`);
    console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}, Upserted: ${result.upsertedCount}`);
    
    // Verify the changes
    const settings = await db.collection('settings').findOne({});
    console.log('\n📝 Updated shop information:');
    console.log(`Shop Name: ${settings.shopName}`);
    console.log(`Phone: ${settings.shopPhone}`);
    console.log(`WhatsApp: ${settings.shopWhatsapp}`);
    console.log(`Landline: ${settings.shopLandline}`);
    console.log(`Location: ${settings.shopLocation}`);
    console.log(`Google Maps: ${settings.googleMapsUrl}`);
    
    console.log('\n✨ Shop info updated! All frontend pages will now display:');
    console.log('  - Phone: 9842236692');
    console.log('  - WhatsApp: 9842236692');
    console.log('  - Landline: 04343 236697');
    console.log('  - Address: Shop No-185, Bangalore Road, CRS Plaza');
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateShopSettings();
