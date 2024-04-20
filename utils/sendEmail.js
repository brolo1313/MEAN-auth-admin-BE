const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, newPass) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST_EMAIL,
      service: process.env.SERVICE_EMAIL,
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASS_EMAIL,
      },
    });

    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: subject,
      // text: text,
      html: `
            <h1>Hello UserName!</h1>
            <p>This is a your new password: 
            <span 
            style="background-color: antiquewhite;
            padding: 5px 10px;
            border-radius: 5px;">${newPass}</span>
            </p>
            <p>Now you can try login!</p>

            `,
    });

    console.log("email sent sucessfully");

    return true;

  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
};

module.exports = sendEmail;
