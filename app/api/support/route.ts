import { NextResponse } from "next/server";
import { databases } from "@/lib/appwrite";
import ENV from "@/constants/env";

const databaseId = ENV.databaseId;
const collectionId = ENV.collections.support;

export async function GET() {
    try {
        const response = await databases.listDocuments(databaseId, collectionId);
        const supportRequests = response.documents.map((doc) => ({
            $id: doc.$id,
            title: doc.title,
            message: doc.message,
            status: doc.status,
            email: doc.email,
            full_name: doc.full_name,
            priority: doc.priority,
            $createdAt: doc.$createdAt,
            $updatedAt: doc.$updatedAt,
        }));
        return NextResponse.json({ success: true, data: supportRequests });
    } catch (error) {
        console.error("Failed to fetch support requests:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch support requests" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { id, newStatus } = await req.json();

        if (!id || !newStatus) {
            return NextResponse.json({ success: false, error: "Missing required parameters" }, { status: 400 });
        }

        await databases.updateDocument(databaseId, collectionId, id, { status: newStatus });

        return NextResponse.json({ success: true, message: `Support request ${id} status updated successfully` });
    } catch (error) {
        console.error("Failed to update support request status:", error);
        return NextResponse.json({ success: false, error: "Failed to update request status" }, { status: 500 });
    }
}
