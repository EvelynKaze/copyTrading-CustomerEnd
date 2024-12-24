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

const AdminHelp = () => {
  const faqs = [
    {
      question: "How do I reset a user's password?",
      answer:
        "To reset a user's password, go to the Users page, find the user, and click on the 'Reset Password' option. This will send a password reset link to the user's registered email.",
    },
    {
      question: "How can I generate custom reports?",
      answer:
        "Custom reports can be generated from the Reports page. Click on 'Create Custom Report', select the data points you want to include, choose the date range, and click 'Generate Report'.",
    },
    {
      question: "What should I do if I suspect fraudulent activity?",
      answer:
        "If you suspect fraudulent activity, immediately suspend the user's account from the Users page. Then, document the suspicious activity in the Audit Log and contact the security team for further investigation.",
    },
    {
      question: "How do I add a new admin user?",
      answer:
        "To add a new admin user, go to the Settings page, select the 'User Management' tab, and click on 'Add New Admin'. Fill in the required information and set the appropriate permissions for the new admin user.",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-6">Admin Help Center</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search for Help</CardTitle>
          <CardDescription>
            Find answers to your admin questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input placeholder="Search for help..." />
            <Button className="bg-appCardGold text-appDark">
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
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>Contact our admin support team</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full bg-appCardGold text-appDark">
            <Mail className="h-4 w-4 mr-2" />
            Contact Admin Support
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AdminHelp;
