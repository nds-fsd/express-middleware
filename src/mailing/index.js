const dotenv = require('dotenv');
dotenv.config();
const ejs = require('ejs')
const sg = require('@sendgrid/mail')
const sendgrid_key = process.env.SENDGRID;
const sender = process.env.SENDER
sg.setApiKey(sendgrid_key)

// TEMPLATES
const welcome = require('./welcome-email')

const DEFAULT_MESSAGE = {
    to:sender,
    from:sender,
    subject: 'TEST_MAIL',
    text:'TEXT',
    html:`<h1>Hello</h1>`
}

const sendMail = ( message ) =>{
    return sg.send({...DEFAULT_MESSAGE,...message})
}

const sendWelcomeMail = (to, name) => {
const data = {name}
const html = ejs.render(welcome,{data})
const message = {
    ...DEFAULT_MESSAGE,
    subject:'Welcome to the jungle ' + name,
    html,
    to
}

return sendMail(message)
}

module.exports = {sendMail,sendWelcomeMail}