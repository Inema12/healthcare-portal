const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

const sendAppointmentReminder = async (email, doctorName, appointmentTime) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Appointment Reminder',
    html: `
      <h2>Appointment Reminder</h2>
      <p>Your appointment with <strong>${doctorName}</strong> is scheduled for <strong>${appointmentTime}</strong></p>
      <p>Please arrive 10 minutes early.</p>
      <p>If you need to reschedule, please login to your portal.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Reminder email sent to:', email);
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Welcome to Healthcare Portal',
    html: `
      <h2>Welcome, ${name}!</h2>
      <p>Thank you for registering with our Healthcare Portal.</p>
      <p>You can now search for doctors and book appointments.</p>
      <p>If you have any questions, please contact our support team.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', email);
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

module.exports = {
  sendAppointmentReminder,
  sendWelcomeEmail
};
