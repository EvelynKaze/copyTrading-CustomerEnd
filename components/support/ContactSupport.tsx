"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import SupportRequestForm from "./SupportRequestForm"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";



interface ContactSupportProps {
    children: React.ReactNode
}

export default function ContactSupport({ children }: ContactSupportProps) {
    const [isOpen, setIsOpen] = useState(false)
    const isMobile = useMediaQuery("(max-width: 640px)")
    const user = useSelector((state: RootState) => state.user.user);
    const { profile } = useSelector((state: RootState) => state.profile);


    const Content = (
        <>
            <div className="px-4 py-2">
                <SupportRequestForm
                    user_id={user?.id}
                    email={profile?.email_address}
                    full_name={profile?.full_name}
                />
            </div>
        </>
    )

    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={setIsOpen}>
                <DrawerTrigger asChild>{children}</DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Contact Support</DrawerTitle>
                        <DrawerDescription>
                            Fill out this form to send a message to our support team. We&#39;ll get back to you as soon as possible.
                        </DrawerDescription>
                    </DrawerHeader>
                    {Content}
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Contact Support</DialogTitle>
                    <DialogDescription>
                        Fill out this form to send a message to our support team. We&#39;ll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>
                {Content}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

