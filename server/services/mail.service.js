// services/mail.service.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendMail = async ({ to, subject, text }) => {
    await transporter.sendMail({
        from: '"Mon App" <no-reply@monapp.com>',
        to,
        subject,
        text,
    });
};
