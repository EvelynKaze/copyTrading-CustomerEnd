import { Badge } from "@/components/ui/badge"

type Priority = "urgent" | "high" | "normal" | "low"

const priorityColors: Record<Priority, string> = {
    urgent: "bg-red-500 hover:bg-red-600",
    high: "bg-orange-500 hover:bg-orange-600",
    normal: "bg-blue-500 hover:bg-blue-600",
    low: "bg-gray-500 hover:bg-gray-600",
}

interface PriorityBadgeProps {
    priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
    return (
        <Badge className={`${priorityColors[priority]} text-white`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
        </Badge>
    )
}

