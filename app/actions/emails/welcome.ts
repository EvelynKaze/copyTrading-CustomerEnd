export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const response = await fetch("/api/email/welcome", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to send welcome email");
    }

    return result; // Contains { message: "Email sent successfully", id: emailId }
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { error: "Could not send welcome email" };
  }
}
