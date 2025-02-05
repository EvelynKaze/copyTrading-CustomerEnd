"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PriorityBadge } from "./PriorityBadge"
import { databases, ID, Permission, Role } from "@/lib/appwrite";
import { useToast } from "@/hooks/use-toast";
import ENV from "@/constants/env";

interface SupportRequestFormProps {
    email?: string
    full_name?: string
    user_id?: string
}

export default function SupportRequestForm({ full_name, email, user_id}: SupportRequestFormProps) {
    const [title, setTitle] = useState("")
    const [message, setMessage] = useState("")
    // const [status, setStatus] = useState("open")
    const [priority, setPriority] = useState<"urgent" | "high" | "normal" | "low">("normal")

    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
         try {
            const supportData = {
                user_id: user_id,
                full_name: full_name,
                email: email,
                status: "open",
                title: title,
                message: message,
                priority: priority,
            }

             const support = await databases.createDocument(
                 ENV.databaseId,
                 ENV.collections.support,
                 ID.unique(),
                 supportData,
                 [Permission.read(Role.any())]
             );
            console.log("Support opened", support);
             toast({
                 title: "Support Ticket Opened",
                 description: "We'll send you an email once the issue has been resolved.",
             });
         } catch (err){
             const error = err as Error
             toast({
                 title: "Profile Completion Failed",
                 description:
                     error.message ||
                     "There was an error completing your profile. Please try again.",
                 variant: "destructive",
             });
         } finally {
             setIsLoading(false);
         }
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Brief description of your issue"
                    required
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide details about your issue or question"
                    required

                />
            </div>


            <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={priority} onValueChange={setPriority as (value: string) => void}>
                    <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="urgent">
                            <div className="flex items-center space-x-2">
                                <PriorityBadge priority="urgent" />
                                <span>Urgent</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="high">
                            <div className="flex items-center space-x-2">
                                <PriorityBadge priority="high" />
                                <span>High</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="normal">
                            <div className="flex items-center space-x-2">
                                <PriorityBadge priority="normal" />
                                <span>Normal</span>
                            </div>
                        </SelectItem>
                        <SelectItem value="low">
                            <div className="flex items-center space-x-2">
                                <PriorityBadge priority="low" />
                                <span>Low</span>
                            </div>
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button type="submit" className="w-full">
                {isLoading ? "Opening ticket..." : "Submit Request"}
            </Button>
        </form>
    )
}

