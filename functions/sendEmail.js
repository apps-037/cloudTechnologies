const sgMail = require('@sendgrid/mail');

exports.handler = async (event, context) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Set your SendGrid API key

    const { name, email, phone, date, message } = JSON.parse(event.body);

    const msg = {
        to: 'apps0602@gmail.com', // Your recipient email
        from: 'appsaini602@gmail.com', // Change to your verified sender email
        subject: `New Inquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nMessage: ${message}`,
        html: `<strong>Name: ${name}</strong><br>Email: ${email}<br>Phone: ${phone}<br>Date: ${date}<br>Message: ${message}`,
    };

    try {
        await sgMail.send(msg);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Email sent successfully!' }),
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error sending email.' }),
        };
    }
};
