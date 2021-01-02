const nodemailer = require('nodemailer')
const pug = require('pug')
const htmlToText = require('html-to-text')

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `${process.env.EMAIL_FROM}`;
    }
    newTransport() {
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            service: 'SenderGrid',
            auth: {
                user: process.env.SENDGRID_USERNAME,
                pass: process.env.SENDGRID_PASSWORD
            }
        })

        transporter.verify((err, success) => {
            if (err) { console.error(err); }
            else {
                console.log('Your config is correct');
            }
        });
        return transporter;
    }
    async send(template, subject) {
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText.fromString(html)
        }
        await this.newTransport().sendMail(mailOptions);
    }
    async sendWelcome() {
        await this.send('welcome', 'Welcome to the HireAMaid Family')
        console.log('email sent')
    }

    async sendPasswordReset() {
        await this.send(
            'password Reset',
            'Your password reset token (valid for only minutes'
        )
    }


}