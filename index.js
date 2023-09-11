
import nodemailer from 'nodemailer';
import cors from 'cors';
import express from 'express';
// const cors = require('cors');
// const express = require('express');
const app = express();
// const PORT = process.env.PORT ?? 8081;
const corsOptions = {
    origin: ['http://localhost:3001', 'https://example.com'], // Add the allowed origins here
};


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'oseintilegacycentreinc@gmail.com',
        pass: 'tzjkvbnsxdivhtow',
    },
});
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/users', (req, res) => {
    // Return a list of users
    res.json([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Doe' },
    ]);
});

app.use(express.json()); // Allows the server to parse JSON requests
app.use(cors());
app.use(cors(corsOptions));
app.post('/send-email', (req, res) => {
    const { from, to, subject, text } = req.body; // Use the data from the request body

    const mailOptions = {
        from, // Use the 'from' value from the request body
        to, // Use the 'to' value from the request body
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Email sending failed.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully.');
        }
    });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
