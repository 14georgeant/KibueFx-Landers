
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendSignupNotification(name, email) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: "New Signup on KibueFx",
    html: `<h3>New Signup</h3><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p>`,
  });
}

module.exports = sendSignupNotification;
