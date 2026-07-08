import nodemailer from 'nodemailer';
import { env } from './env.js';

export const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS
  }
});

export const sendRSVPNotification = async (hostEmail, coupleNames, guestName, rsvpDetails) => {
  const mailOptions = {
    from: '"Invitely Notifications" <notifications@invitely.co>',
    to: hostEmail,
    subject: `New RSVP Confirmed by ${guestName}!`,
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #f3f4f6; border-radius: 12px; padding: 24px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h2 style="color: #db2777; font-family: Georgia, serif; text-align: center; margin-bottom: 24px;">New Wedding RSVP</h2>
        <p>Dear <strong>${coupleNames}</strong>,</p>
        <p>You have received a new RSVP response for your wedding portal!</p>
        
        <div style="background-color: #fff1f2; border-left: 4px solid #db2777; padding: 16px; margin: 20px 0; border-radius: 4px;">
          <p style="margin: 0 0 8px 0;"><strong>Guest Name:</strong> ${guestName}</p>
          <p style="margin: 0 0 8px 0;"><strong>Status:</strong> <span style="text-transform: capitalize; color: #9d174d; font-weight: bold;">${rsvpDetails.status}</span></p>
          <p style="margin: 0 0 8px 0;"><strong>Party Size:</strong> ${rsvpDetails.guestsCount} ${rsvpDetails.guestsCount === 1 ? 'Person' : 'People'}</p>
          <p style="margin: 0 0 8px 0;"><strong>Food Preference:</strong> <span style="text-transform: capitalize;">${rsvpDetails.foodPreference}</span></p>
          ${rsvpDetails.message ? `<p style="margin: 8px 0 0 0; font-style: italic; color: #4b5563;">"${rsvpDetails.message}"</p>` : ''}
        </div>
        
        <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 32px;">
          Invitely Notification Engine • Creative digital invitations for your weddings and events.
        </p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`RSVP Notification email dispatched: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`Error dispatching email notification: ${error.message}`);
    return false;
  }
};
