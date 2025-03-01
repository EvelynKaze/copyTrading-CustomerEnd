"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { EmailForm, type EmailData } from "@/components/admin-email/EmailForm";
import { Mail } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { fetchEmails, sendEmail } from "@/app/actions/email";
// import { Resend } from "resend";

export default function AdminEmailPage() {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [emails, setEmails] = useState<{ id: string; to: string; subject: string; status: string; createdAt: string }[]>([]);

  // const resend = new Resend("re_2ad7MSLv_CDv1hRgQzeqzmfnAMYraadfE");
  // Fetch all emails on page load
  useEffect(() => {
    async function loadEmails() {
      const fetchedEmails = await fetchEmails();
      setEmails(fetchedEmails);
    }
    loadEmails();
  }, []);

  const handleSubmit = async (emailData: EmailData) => {
    console.log("Sending Email:", emailData);
    // try{
    //   const data = await resend.emails.send({
    //     from: emailData.from,
    //     to: [emailData.to],
    //     subject: emailData.subject,
    //     html: `<p>${emailData.message}</p>`,
    //   });
    //   console.log("Successfully sent", data)
    // } catch(err){
    //   console.error("failed to send", err)
    // }
    

    // Send email and determine status
    const result = await sendEmail(emailData);
    console.log("Email Sent:", result);

    // Update email status
    const updatedEmail = {
      ...emailData,
      status: result.status,
      id: result.id,
      createdAt: new Date().toISOString(),
    };

    // // Update email list
    setEmails((prevEmails) => [updatedEmail, ...prevEmails]);

    setIsOpen(false);
  };

  const Content = <EmailForm onSubmit={handleSubmit} onCancel={() => setIsOpen(false)} />;

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Admin Email Center</h1>
        {isMobile ? (
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Compose Email</DrawerTitle>
                <DrawerDescription>Fill out this form to send an email.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4 pb-0">{Content}</div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        ) : (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Send Email
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Compose Email</DialogTitle>
                <DialogDescription>Fill out this form to send an email.</DialogDescription>
              </DialogHeader>
              {Content}
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Table of past emails */}
      <div className="bg-card rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Past Emails</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>To</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {emails.length > 0 ? (
              emails.map((email) => (
                <TableRow key={email.id}>
                  <TableCell>{email.to}</TableCell>
                  <TableCell>{email.subject}</TableCell>
                  <TableCell>
                    <Badge
                      variant={email.status === "received" ? "default" : "destructive"}
                      className={email.status === "received" ? "text-white bg-green-600" : "text-white bg-red-600"}
                    >
                      {email.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(email.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4">
                  No emails sent yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
