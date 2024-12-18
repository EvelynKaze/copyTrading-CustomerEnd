import { Plus } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QuickTransferUser } from "@/types/dashboard";

interface QuickTransferProps {
  users: QuickTransferUser[];
}

export function QuickTransfer({ users }: QuickTransferProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Quick Transfer</h2>
      <div className="flex gap-2">
        {users.map((user) => (
          <button
            key={user.id}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:opacity-80"
          >
            <Image
              src={user.avatar}
              alt={user.name}
              width={40}
              height={40}
              className="rounded-full"
            />
          </button>
        ))}
        <button className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-2">
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground">Amount</label>
          <Input placeholder="$1,500" />
        </div>
        <Button className="w-full">Transfer</Button>
      </div>
    </div>
  );
}
