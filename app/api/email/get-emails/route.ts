import { databases } from "@/lib/appwrite";
import { NextResponse } from "next/server";
import ENV from "@/constants/env";

const databaseId = ENV.databaseId;
const collectionId = ENV.collections.emails; // Ensure this collection exists in Appwrite

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
  