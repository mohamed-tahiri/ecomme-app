import { sendMail } from '../services/mail.service.js';
import axios from 'axios';

const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

const sendSlack = async (msg) => {
    if (!slackWebhookUrl) return;
    try {
        await axios.post(slackWebhookUrl, {
            text: `🚨 *Server Error:* ${msg}`,
        });
    } catch (err) {
        console.error('Failed to send Slack alert:', err.message);
    }
};

const sendEmail = async (msg) => {
    try {
        await sendMail({
            to: process.env.ALERT_EMAIL_TO,
            subject: '🚨 Server Error Alert',
            text: msg,
        });
    } catch (err) {
        console.error('Failed to send email alert:', err.message);
    }
};

export default async function notify(msg) {
    await Promise.all([sendSlack(msg), sendEmail(msg)]);
}
