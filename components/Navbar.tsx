import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="flex justify-end w-full">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
}
