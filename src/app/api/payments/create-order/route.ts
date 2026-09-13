import { NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/payments/razorpay';
import { SubscriptionPlanId } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { planId, userId } = body;

    if (!planId || !userId) {
      return NextResponse.json({ error: 'Missing required parameters (planId, userId).' }, { status: 400 });
    }

    const order = await createRazorpayOrder(planId as SubscriptionPlanId, userId);
    return NextResponse.json({ success: true, order });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Payment initialization failed.' }, { status: 500 });
  }
}
