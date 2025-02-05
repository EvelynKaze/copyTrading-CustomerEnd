export interface SupportRequest {
    $id: string
    title: string
    message: string
    status: "open" | "in-progress" | "resolved"
    priority: "urgent" | "high" | "normal" | "low"
    $createdAt: string
    $updatedAt: string
}

export const sampleSupportRequests: SupportRequest[] = [
    {
        $id: "1",
        title: "Unable to login to my account",
        message: 'I\'ve been trying to log in for the past hour but keep getting an "Invalid credentials" error.',
        status: "open",
        priority: "high",
        $createdAt: "2023-06-15T10:30:00Z",
        $updatedAt: "2023-06-15T10:30:00Z",
    },
    {
        $id: "2",
        title: "Feature request: Dark mode",
        message:
            "It would be great if we could have a dark mode option for the dashboard. It would help reduce eye strain during night-time use.",
        status: "in-progress",
        priority: "normal",
        $createdAt: "2023-06-14T15:45:00Z",
        $updatedAt: "2023-06-15T09:20:00Z",
    },
    {
        $id: "3",
        title: "Critical bug in payment processing",
        message:
            "Customers are reporting that their payments are being processed twice. This needs to be fixed immediately.",
        status: "open",
        priority: "urgent",
        $createdAt: "2023-06-15T08:00:00Z",
        $updatedAt: "2023-06-15T08:00:00Z",
    },
    {
        $id: "4",
        title: "Question about pricing tiers",
        message:
            "I'm considering upgrading my account. Could you provide more details about what's included in the Pro tier?",
        status: "resolved",
        priority: "low",
        $createdAt: "2023-06-13T11:20:00Z",
        $updatedAt: "2023-06-14T14:30:00Z",
    },
    {
        $id: "5",
        title: "Integration with third-party API not working",
        message:
            "The integration with the XYZ API seems to be broken. I'm getting timeout errors when trying to sync data.",
        status: "in-progress",
        priority: "high",
        $createdAt: "2023-06-14T09:15:00Z",
        $updatedAt: "2023-06-15T11:45:00Z",
    },
]

