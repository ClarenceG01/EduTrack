const { createTransport } = require("nodemailer");

const email_config = require("../config/emailConfig");

const transporter = createTransport(email_config);

async function sendMail(message) {
  try {
    let result = await transporter.sendMail(message);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMail };
