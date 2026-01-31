const Enquiry = require('../models/Enquiry');
const nodemailer = require('nodemailer');

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.createEnquiry = async (req, res) => {
  try {
    const { productId, name, email, phone, message, enquiryType } = req.body;

    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: 'Please provide name, email, and phone' });
    }

    const enquiry = await Enquiry.create({
      user: req.user?.id || null,
      product: productId || null,
      name,
      email,
      phone,
      message,
      enquiryType: enquiryType || 'contact-form',
    });

    // Send email notification to owner
    try {
      const ownerEmail = process.env.OWNER_EMAIL || 'arselectronicsworld@gmail.com';
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: ownerEmail,
        subject: `New Enquiry from ${name}`,
        html: `
          <h2>New Enquiry Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Type:</strong> ${enquiryType || 'General'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <hr />
          <p><small>Received at: ${new Date().toLocaleString()}</small></p>
        `,
      });
      console.log('✓ Email sent to:', ownerEmail);
    } catch (emailError) {
      console.log('⚠ Email notification failed:', emailError.message);
    }

    res.status(201).json({
      message: 'Enquiry created successfully and owner notified via email',
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find()
      .populate('product')
      .populate('user')
      .sort({ createdAt: -1 });

    res.status(200).json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['pending', 'contacted', 'resolved'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({
      message: 'Enquiry status updated successfully',
      enquiry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: 'Enquiry not found' });
    }

    res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
