const nodemailer = require('nodemailer');
const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.host,
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USERNAME,
            password: process.env.EMAIL_PASSWORD,
        }

    });
    const mailOptions = {
        from: 'Arpan Das <hello@jonas.io>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    await transporter.sendMail(mailOptions)
}
module.exports = sendMail;