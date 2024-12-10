import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
}

export default function Testimonials({
  name,
  role,
  content,
  avatar,
}: Testimonial) {
  return (
    <Card className="backdrop-blur-md bg-transparent border border-appDarkCard dark:border-appGold20 hover:border-t-appGold100 hover:shadow-highlight-top hover:shadow-appGold100 transition-all duration-300 ease-linear shadow-inner shadow-appGold20">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
            {avatar ? (
              <AvatarImage src={avatar} alt={name} />
            ) : (
              <AvatarFallback className="bg-[#1D2033] dark:text-white">
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>
          <div className="flex flex-col">
            <div className="font-semibold dar:text-white">{name}</div>
            <div className="text-sm dark:text-gray-400">{role}</div>
          </div>
        </div>
        <div className="mt-4 dark:text-gray-300 text-
        sm leading-relaxed">
          {content}
        </div>
      </CardContent>
    </Card>
  );
}
