const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'mailhog',
    port: 1025,
    secure: false,
});

async function sendMail({ to, subject, html }) {
    const from = "InPlace <inplace.service.mail@gmail.com>"
    await transporter.sendMail({ to, from, subject, html });
}

module.exports = { sendMail };
