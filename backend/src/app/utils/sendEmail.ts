import nodemailer from "nodemailer";
import config from "../../config";

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.EMAIL.ADDRESS,
        pass: config.EMAIL.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: config.EMAIL.ADDRESS, // sender address
      to, // list of receivers
      subject: `${subject} - AI Tasks Generator`, // Subject line
      text: "", // plain text body
      html, // html body
    });

    if (info.accepted.length > 0) {
      return {
        success: true,
        messageId: info.messageId,
        accepted: info.accepted,
        response: info.response,
      };
    } else {
      return {
        success: false,
        message: "Email not sent!",
      };
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
