import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { NextRequest, NextResponse } from 'next/server';


const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
});

export  async function POST(req:Request) {

    const { to, subject, text, html } = await  req.json();

    try {
      const msg = await mg.messages.create(process.env.MAILGUN_DOMAIN ||'', {
        from: 'Excited User <mailgun@sandbox-123.mailgun.org>',
        to,
        subject,
        text,
        html,
      });

     return NextResponse.json({ message: 'Email sent', data: msg }, {status:200});
    } catch (error) {
      console.error(error);
     return NextResponse.json({ error: 'Error sending email' },{status:4001});
    }
}
