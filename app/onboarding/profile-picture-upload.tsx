import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ProfilePictureUploadProps {
  form: UseFormReturn<any>;
}

export function ProfilePictureUpload({ form }: ProfilePictureUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
        form.setValue("profilePicture", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <FormField
      control={form.control}
      name="profilePicture"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profile Picture</FormLabel>
          <FormControl>
            <div className="flex items-center space-x-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={previewUrl || ""} alt="Profile picture" />
                <AvatarFallback>
                  {form.getValues("fullName")?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-auto"
              />
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
}
