export async function fetchSupportRequests() {
    try {
        const response = await fetch("/api/support");
        const data = await response.json();
        
        if (!data.success) throw new Error(data.error);
        
        return data.data;
    } catch (error) {
        console.error("Error fetching support requests:", error);
        return [];
    }
}

export async function updateSupportRequestStatus(id: string, newStatus: string) {
    try {
        const response = await fetch("/api/support", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, newStatus }),
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.error);

        return true;
    } catch (error) {
        console.error("Error updating support request:", error);
        return false;
    }
}
