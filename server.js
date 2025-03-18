const express = require("express");
const sgMail = require("@sendgrid/mail");
const cors = require("cors");
const path = require("path");
require("dotenv").config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*", // Change to your frontend URL in production
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
}));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set SendGrid API key
if (!process.env.SENDGRID_API_KEY) {
    console.error("SENDGRID_API_KEY is not set in environment variables.");
    process.exit(1); // Exit the process if API key is missing
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/send", async (req, res) => {
    const { name, email, phone, date, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const msg = {
        to: "sainiclasses.pune@gmail.com", // Change to your recipient email
        from: "appsaini602@gmail.com", // Change to your verified sender email
        subject: `New Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nMessage: ${message}`,
        html: `<strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Phone:</strong> ${phone}<br><strong>Date:</strong> ${date}<br><strong>Message:</strong> ${message}`,
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error.response ? error.response.body : error);
        res.status(500).json({ error: "Error sending email." });
    }
});

// Serve the frontend by default
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));