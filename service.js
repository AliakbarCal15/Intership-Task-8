const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Create nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aliakbarcal15@gmail.com', 
        pass: 'jzsdousldbrklmxd'     
    }
});

app.post('/send-email', async (req, res) => {
    const { name, email, service, date, slot } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com', // Replace with your Gmail
        to: email,
        subject: 'Appointment Confirmation - Blink Auto',
        html: `
            <h1>Appointment Confirmation</h1>
            <p>Dear ${name},</p>
            <p>Your appointment at Blink Auto has been confirmed with the following details:</p>
            <ul>
                <li><strong>Service:</strong> ${service}</li>
                <li><strong>Date:</strong> ${date}</li>
                <li><strong>Time Slot:</strong> ${slot}</li>
            </ul>
            <p>If you need to make any changes to your appointment, please contact us.</p>
            <br>
            <p>Best regards,</p>
            <p>Blink Auto Team</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email' });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});