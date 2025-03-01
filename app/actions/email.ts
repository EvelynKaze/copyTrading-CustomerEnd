"use server";

const API_URL = "/api/send-email";

// Send Email
export async function sendEmail(emailData: {
  from: string;
  to: string;
  subject: string;
  message: string;
}) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    const data = await response.json();

    return {
      success: response.ok,
      status: data.status,
      id: data.id || "failed",
      message: data.message,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, status: "rejected", id: "failed", message: "Failed to send email" };
  }
}

// Fetch All Emails
export async function fetchEmails() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data.emails || [];
  } catch (error) {
    console.error("Error fetching emails:", error);
    return [];
  }
}
