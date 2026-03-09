import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, attending } = await request.json();

    const { data, error } = await resend.emails.send({
      from: 'Jastine & Leonard <onboarding@resend.dev>',
      to: ['buanleonard44@gmail.com'], // Send to the couple
      subject: `New RSVP: ${name} - ${attending === 'yes' ? 'Accepts' : 'Declines'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #d4af37;">New Wedding RSVP</h1>
          <p>A new guest has responded to your invitation.</p>
          
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Response:</strong> <span style="color: ${attending === 'yes' ? 'green' : 'red'}; font-weight: bold;">${attending === 'yes' ? 'Joyfully Accepts' : 'Regretfully Declines'}</span></p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}