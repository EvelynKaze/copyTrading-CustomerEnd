"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

const Help = () => {
  const router = useRouter();

  const faqs = [
    {
      question: "How can I update my account information?",
      answer:
        "You can update your account information by going to the Settings page. There, you'll find options to edit your profile, change your profile picture, and update other account details.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. For more details, please refer to our Privacy Policy.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our customer support team by emailing support@copytradingmarkets.com or by using the contact form at the bottom of this page. We aim to respond to all inquiries within 24 hours.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container h-full overflow-y-scroll mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search for Help</CardTitle>
          <CardDescription>Find answers to your questions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input placeholder="Search for help..." />
            <Button className="bg-appCardGold text-appDarkCard">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Still Need Help?</CardTitle>
          <CardDescription>Contact our support team</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/dashboard/support")} className="w-full bg-appCardGold text-appDarkCard">
            <Mail className="h-4 w-4 mr-2" />
            Contact Support
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Help;
