"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./Sidebar";
import { useMediaQuery } from "react-responsive";

interface MobileSidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

export default function MobileSidebar({
  apiLimitCount,
  isPro = false,
}: MobileSidebarProps) {
  const isMobile = useMediaQuery({ query: `(max-width: 800px)` });
  if (!isMobile) return;
  return (
    <Sheet>
      <SheetTrigger>
        <span className="md:hidden">
          <Menu />
        </span>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
}
