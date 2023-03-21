import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

export default async function sendEmail(to, subject, token = null) {
  const link = token ? `https://pet-support.up.railway.app/api/auth/verify/${token}` : '';


  const htmlContent = `
    <h1>${subject}</h1>
    <p>${token ? `Click the link below to continue:` : ''}</p>
    ${link ? `<a href="${link}" target="_blank">Click here</a>` : ''}
  `;

  const msg = {
    to,
    from: 'ili.nandr.ii.85@gmail.com',
    subject,
    html: htmlContent,
  };

  try {
    const response = await sgMail.send(msg);
    console.log('Email sent successfully');
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
