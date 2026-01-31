#!/usr/bin/env node

const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/ars_electronics';

async function updateAdminRole() {
  try {
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');
    
    const db = mongoose.connection.db;
    const result = await db.collection('users').updateOne(
      { email: 'admin@arselectronics.com' },
      { $set: { role: 'admin' } }
    );
    
    console.log(`\n✅ Admin role updated successfully!`);
    console.log(`Matched: ${result.matchedCount}, Modified: ${result.modifiedCount}`);
    
    // Verify the change
    const updatedUser = await db.collection('users').findOne({ email: 'admin@arselectronics.com' });
    console.log('\n📝 Updated user details:');
    console.log(`Email: ${updatedUser.email}`);
    console.log(`Name: ${updatedUser.name}`);
    console.log(`Role: ${updatedUser.role}`);
    console.log(`Phone: ${updatedUser.phone}`);
    
    console.log('\n✨ Admin setup complete!');
    console.log('You can now login at: http://localhost:3000/login');
    console.log('Email: admin@arselectronics.com');
    console.log('Admin Panel: http://localhost:3000/admin');
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateAdminRole();
