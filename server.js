const express = require("express");
const sgMail = require('@sendgrid/mail');
const cors = require("cors");
require('dotenv').config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public')); // Serve static files from the 'public' directory

sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API key

app.post("/send", async (req, res) => {
    const { name, email, phone, date, message } = req.body;

    const msg = {
        to: 'sainiclasses.pune@gmail.com', // Change to your recipient email
        from: 'appsaini602@gmail.com', // Change to your verified sender email
        subject: `New Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nMessage: ${message}`,
        html: `<strong>Name: ${name}</strong><br>Email: ${email}<br>Phone: ${phone}<br>Date: ${date}<br>Message: ${message}`,
    };

    try {
        await sgMail.send(msg);
        res.status(200).send("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).send("Error sending email.");
    }
});

// Serve the frontend by default
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Adjust the path as needed
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

