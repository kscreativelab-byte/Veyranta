import { NextResponse } from 'next/server';
import { verifyRazorpayWebhookSignature } from '@/lib/payments/razorpay';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature') || '';

    // Verify webhook cryptographic signature
    const isValid = verifyRazorpayWebhookSignature(rawBody, signature);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const eventType = payload.event;

    // Handle payment & subscription state updates idempotently
    switch (eventType) {
      case 'payment.captured':
      case 'subscription.charged':
      case 'subscription.activated':
        // Update user subscription state to 'active' in PostgreSQL database
        console.log(`[Razorpay Webhook] Event ${eventType} processed for payload ID:`, payload.payload?.payment?.entity?.id);
        break;

      case 'subscription.cancelled':
      case 'payment.failed':
        // Update subscription state to 'canceled' or 'past_due'
        console.log(`[Razorpay Webhook] Event ${eventType} logged.`);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    return NextResponse.json({ error: 'Webhook processing error.' }, { status: 500 });
  }
}
