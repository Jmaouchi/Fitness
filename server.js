// Required packages
const express = require('express');
const sequelize = require('./config/connection');
const path = require('path');
const routes = require('./controllers');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Set up Handlebars.js as the app's template engine
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Mailgun SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.mailgun.org',
  port: 587, // Mailgun recommended port
  auth: {
    user: process.env.MAILGUN_USER, // Mailgun SMTP username from .env
    pass: process.env.MAILGUN_PASSWORD, // Mailgun SMTP password or private API key from .env
  },
});

// Verify SMTP transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP connection successful:', success);
  }
});

// Email sending route
app.post('/send-email', (req, res) => {
  console.log('Request body:', req.body);

  const { email, subject, message } = req.body;

  // Validate input fields
  if (!email || !subject || !message || !/\S+@\S+\.\S+/.test(email)) {
    console.error('Invalid or missing required fields');
    return res.status(400).json({ success: false, message: 'Invalid or missing required fields!' });
  }

  const mailOptions = {
    from: 'brad@fitness.mydomain.com ', // Replace with your verified Mailgun domain email
    to: email,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error while sending mail:', error);
      return res.status(500).json({
        success: false,
        message: 'Email not sent!',
        error: error.message || error,
      });
    }
    res.status(200).json({ success: true, message: 'Email sent successfully!', info });
  });
});

// Turn on routes
app.use(routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on server ${PORT}`));
});
