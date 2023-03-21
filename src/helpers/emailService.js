import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

export default async function sendEmail(to, subject, token = null) {
  const link = token
    ? `https://pet-support.up.railway.app/api/auth/verify/${token}`
    : "";

  const msg = {
    to,
    from: "ili.nandr.ii.85@gmail.com",
    template_id: "d-945c1a5f8dfb498b8bc61f7e218633c4",
    dynamic_template_data: {
      subject,
      // verificationLink: link,
      href: link,
    },
  };

  try {
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
