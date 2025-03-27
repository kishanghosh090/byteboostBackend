import nodemailer from "nodemailer";

const sendEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or another service
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL, // Your email to receive messages
    subject: `byteboost sevice client data`,
    text: `
    client email: ${data.email},
    client phone No: ${data.phoneNumber},
    client Description: ${data.description},
    client project type: ${data.type}
    `,
  };

  try {
    const otpSend = await transporter.sendMail(mailOptions);
    return otpSend;
  } catch (error) {
    return error;
  }
};

export default sendEmail;
