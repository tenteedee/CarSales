const nodemailer = require("nodemailer");
const {
  MAIL_HOST,
  MAIL_PORT,
  MAIL_ENCRYPTION,
  MAIL_USERNAME,
  MAIL_PASSWORD,
  MAIL_FROM_NAME,
  MAIL_FROM_ADDRESS,
} = require("../config/Config");
const transporter = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_ENCRYPTION === "ssl",
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});
const sendMail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `${MAIL_FROM_NAME} <${MAIL_FROM_ADDRESS}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};

module.exports = { sendMail };
