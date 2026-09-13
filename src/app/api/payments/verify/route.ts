import { NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/payments/razorpay';
import { supabase } from '@/lib/supabase/client';
import { SubscriptionPlanId } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId, userId } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !planId || !userId) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters for payment verification.' },
        { status: 400 }
      );
    }

    // Cryptographic signature verification using RAZORPAY_KEY_SECRET
    const isValid = verifyRazorpaySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature || '');

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Payment signature verification failed.' },
        { status: 400 }
      );
    }

    // Persist active subscription into Supabase database
    try {
      await supabase
        .from('subscriptions')
        .upsert({
          user_id: userId,
          plan_id: planId,
          status: 'active',
          razorpay_subscription_id: razorpay_payment_id,
          current_period_start: new Date().toISOString(),
          current_period_end: new Date(Date.now() + 30 * 86400000).toISOString(),
          updated_at: new Date().toISOString()
        });

      await supabase
        .from('payment_events')
        .insert({
          user_id: userId,
          event_type: 'payment_captured',
          razorpay_event_id: razorpay_payment_id,
          amount: planId === 'pro' ? 79900 : planId === 'starter' ? 29900 : 249900,
          payload: { orderId: razorpay_order_id, planId }
        });
    } catch (dbErr) {
      console.warn('Database record insertion warning (non-fatal):', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully.',
      planId
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Payment verification failed.' },
      { status: 500 }
    );
  }
}
