import { FC } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";

interface MobileSidebarProps {
  isPro: boolean;
}

const MobileSidebar: FC<MobileSidebarProps> = ({ isPro }) => {
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-secondary pt-10 w-32">
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
