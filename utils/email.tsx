
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export const sendActivityNotification = async (email: string, dates: string[]) => {
  const subject = "Your Scheduled Activities";
  const text = `Hi there, here are your scheduled activities:\n\n${dates.join('\n')}`;

  try {
    await resend.emails.send({
      to: email,
      from: 'no-reply@ai-health.com',   
      subject: subject,
      text: text,
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
