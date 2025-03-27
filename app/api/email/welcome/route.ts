import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import Welcome from "@/components/email-templates/welcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name } = body;
    if (!email || !name) {
      return NextResponse.json(
        { message: "Email or name is missing" },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: "Harry from CopyTradingMarkets <harry@copytradingmarkets.com>",
      to: [email],
      subject: `Onboarding to CopyTradingMarkets`,
      react: Welcome({ name }),
    });

    return NextResponse.json({
      message: "Email sent successfully",
      id: data.data?.id,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Email not sent", error: err },
      { status: 500 }
    );
  }
}