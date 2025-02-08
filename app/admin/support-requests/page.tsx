"use client"

import { useEffect, useState} from "react"
import { AdminSupportRequestList } from "@/components/support/AdminSupportRequestList"
import { type SupportRequest } from "@/components/support/SampleSupportRequests"
import { databases } from "@/lib/appwrite";
import ENV from "@/constants/env";

export default function AdminSupportCenter() {
    const [requests, setRequests] = useState<SupportRequest[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const databaseId = ENV.databaseId;
    const collectionId = ENV.collections.support;

    useEffect(() => {
        const fetchSupport = async () => {
            setIsLoading(true);
            try {
                const response = await databases.listDocuments(
                    databaseId,
                    collectionId,
                );
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
                setRequests(supportRequests);
                console.log("Successfully fetch support", response.documents);
            } catch (error) {
                console.error("Failed to fetch stocks:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSupport();
    }, [collectionId, databaseId]);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            await databases.updateDocument(
                databaseId,
                collectionId,
                id,
                { status: newStatus }
            );

            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.$id === id
                        ? { ...request, status: newStatus as SupportRequest["status"], $updatedAt: new Date().toISOString() }
                        : request,
                )
            );

            console.log(`Support request ${id} status updated to ${newStatus}`);
        } catch (error) {
            console.error(`Failed to update status for request ${id}:`, error);
        }
    };


    return (
        <div className="container mx-auto py-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Admin Support Center</h1>
            </div>
            <div className="bg-card rounded-lg shadow-md p-6">
                <AdminSupportRequestList isLoading={isLoading} requests={requests} onStatusUpdate={handleStatusUpdate} />
            </div>
        </div>
    )
}

