const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey);

sgMail.send({
    to: 'abhisharma129@gmail.com',
    from: 'abhisharma129@gmail.com',
    subject: 'This is my first creation!',
    text: 'I hope this one actually get to you.'
})