const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'inplace.service.mail@gmail.com',
        pass: process.env.MAIL_APP_PASSWORD
    }
});

async function sendMail({ to, subject, html }) {
    const from = "InPlace <inplace.service.mail@gmail.com>"
    await transporter.sendMail({ to, from, subject, html });
}

module.exports = { sendMail };
