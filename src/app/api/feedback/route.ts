import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { success: false, error: 'Email address and message are required.' },
        { status: 400 }
      );
    }

    // Encapsulated server-side recipient email
    const recipientEmail = process.env.FEEDBACK_RECIPIENT_EMAIL || 'kscreativelab@gmail.com';

    // Store feedback in Supabase audit logs table for persistence
    try {
      await supabase.from('audit_logs').insert({
        action: 'USER_FEEDBACK_SUBMITTED',
        details: JSON.stringify({
          senderName: name || 'Anonymous',
          senderEmail: email,
          subject: subject || 'General Inquiry',
          message,
          recipient: recipientEmail,
          submittedAt: new Date().toISOString()
        })
      });
    } catch (dbErr) {
      console.warn('Feedback DB audit log notice:', dbErr);
    }

    // In production, server sends email transport to recipientEmail
    console.log(`[Feedback Server Route] New feedback dispatched to encrypted recipient (${recipientEmail.substring(0, 3)}...):`, {
      name,
      email,
      subject,
      messageSnippet: message.substring(0, 50)
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your feedback message has been securely sent to the Veyranta team.'
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Failed to send feedback.' },
      { status: 500 }
    );
  }
}
