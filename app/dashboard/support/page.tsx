import ContactSupport from "@/components/support/ContactSupport"
import { SupportRequestList } from "@/components/support/SupportRequestList"
// import { sampleSupportRequests } from "@/components/support/SampleSupportRequests"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

export default function SupportCenter() {
    return (
        <div className="container mx-auto py-6 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Support Center</h1>
                <ContactSupport>
                    <Button className="bg-appCardGold text-appDarkCard">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Request
                    </Button>
                </ContactSupport>
            </div>
            <div className="bg-card rounded-lg shadow-md p-6">
                <SupportRequestList />
            </div>
        </div>
    )
}

