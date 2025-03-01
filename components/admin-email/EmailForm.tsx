"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface EmailFormProps {
  onSubmit: (emailData: EmailData) => void
  onCancel: () => void
}

export interface EmailData {
  from: string
  to: string
  subject: string
  message: string
}

export function EmailForm({ onSubmit, onCancel }: EmailFormProps) {
  const [emailData, setEmailData] = useState<EmailData>({
    from: "admin@copytradingmarkets.com", // This could be fetched from a global state or context
    to: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmailData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(emailData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="from">From</Label>
        <Input id="from" name="from" value={emailData.from} disabled />
      </div>
      <div className="space-y-2">
        <Label htmlFor="to">To</Label>
        <Input
          id="to"
          name="to"
          value={emailData.to}
          onChange={handleChange}
          placeholder="recipient@example.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          value={emailData.subject}
          onChange={handleChange}
          placeholder="Email subject"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          value={emailData.message}
          onChange={handleChange}
          placeholder="Type your message here"
          required
          className="min-h-[200px]"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Send Email</Button>
      </div>
    </form>
  )
}

