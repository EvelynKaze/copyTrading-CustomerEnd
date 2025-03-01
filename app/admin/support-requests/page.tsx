"use client"

import { useEffect, useState} from "react"
import { AdminSupportRequestList } from "@/components/support/AdminSupportRequestList"
import { type SupportRequest } from "@/components/support/SampleSupportRequests"
import { fetchSupportRequests, updateSupportRequestStatus } from "@/app/actions/support";
import { useToast } from "@/hooks/use-toast";

export default function AdminSupportCenter() {
    const [requests, setRequests] = useState<SupportRequest[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { toast } = useToast();

    useEffect(() => {
        const loadSupportRequests = async () => {
            setIsLoading(true);
            const supportRequests = await fetchSupportRequests();
            setRequests(supportRequests);
            setIsLoading(false);
        };

        loadSupportRequests();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        const success = await updateSupportRequestStatus(id, newStatus);

        if (success) {
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.$id === id
                        ? { ...request, status: newStatus as SupportRequest["status"], $updatedAt: new Date().toISOString() }
                        : request
                )
            );
            toast({ title: "Success", description: "Support request updated successfully!" });
        } else {
            toast({ title: "Error", description: "Failed to update request status", variant: "destructive" });
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
    );
}

