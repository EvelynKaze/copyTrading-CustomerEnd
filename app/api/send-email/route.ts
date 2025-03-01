import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { databases, ID } from "@/lib/appwrite";
import ENV from "@/constants/env";

const resend = new Resend(process.env.RESEND_API_KEY);
const databaseId = ENV.databaseId;
const collectionId = ENV.collections.emails; // Ensure this collection exists in Appwrite

// Send Email and Store in Appwrite
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { from, to, subject, message } = body;

    if (!to || !from || !message) {
      return NextResponse.json(
        { message: "Email recipient, sender, or message is missing" },
        { status: 400 }
      );
    }

    let emailId = "failed";
    let status = "rejected";

    try {
      // Attempt to send the email using Resend
      const data = await resend.emails.send({
        from: from,
        to: [to],
        subject: subject,
        html: `<p>${message}</p>`,
      });

      if (data.data?.id) {
        emailId = data.data.id;
        status = "received";
      }
    } catch (emailError) {
      console.error("Resend email sending failed:", emailError);
    }

    // Store email details in Appwrite regardless of success or failure
    await databases.createDocument(databaseId, collectionId, ID.unique(), {
      from,
      to,
      subject,
      message,
      email_id: emailId,
      status,
    //   sentAt: new Date().toISOString(),
    });

    return NextResponse.json({
      message: emailId === "failed" ? "Email sending failed, but stored in Appwrite" : "Email sent successfully and stored in Appwrite",
      id: emailId,
      status,
      from,
      to,
      subject
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error", error: err },
      { status: 500 }
    );
  }
}

// Fetch All Sent Emails from Appwrite
export async function GET() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);

    return NextResponse.json({
      message: "Fetched all sent emails",
      emails: response.documents,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch emails", error: err },
      { status: 500 }
    );
  }
}
