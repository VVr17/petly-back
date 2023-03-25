import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";

dotenv.config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

export default async function sendEmail(to, subject, token = null, templateId) {
  let link = "";
  
  if (token) {
    if (subject === "Email Verification") {
      link = `http://localhost:3000/api/auth/verify/${token}`;
    } else if (subject === "Password Reset Request") {
      link = `http://localhost:3000/api/auth/reset-password?token=${token}`;
    }
  }

  const msg = {
    to,
    from: "ili.nandr.ii.85@gmail.com",
    template_id: templateId,
    dynamic_template_data: {
      subject,
      buttonLink: link,
    },
  };

  console.log('Button link:', link);

  try {
    const response = await sgMail.send(msg);
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
