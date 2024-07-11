'use server'

import cron from 'node-cron';

const scheduleEmails = () => {
  // Schedule emails for Monday, Wednesday, and Friday at 9 AM
  cron.schedule('0 9 * * 1,3,5', async () => {
    const users = [
      { email: 'coinocrypt6@gmail.com', message: "It's time to activity: Push up, Pull up" },
      { email: 'mekuriateketel@gmail.com', message: "Today's activity: Running, Squats" },
    ];

    users.forEach(async (user) => {
      try {
        const response = await fetch('localhost:3000/api/sendgrid', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: user.email,
            subject: 'Health Status Update',
            text: user.message,
            html: `<p>${user.message}</p>`,
          }),
        });

        const data = await response.json();
        console.log(`Email sent to ${user.email}:`, data);
      } catch (error) {
        console.error(`Error sending email to ${user.email}:`, error);
      }
    });
  });
};

export default scheduleEmails;
