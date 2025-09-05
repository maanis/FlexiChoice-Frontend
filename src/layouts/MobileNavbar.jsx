// src/components/layout/MobileNavbar.jsx
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function MobileNavbar({ onMenuClick }) {
    return (
        <header className="md:hidden sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-[#191a2a] px-4 sm:px-6">
            <Button
                variant="ghost"
                size="icon"
                onClick={onMenuClick}
                className="text-white hover:bg-zinc-800/50 hover:text-white"
            >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
            </Button>
            <span className="font-bold text-xl text-white">Flexi-Choice</span>
        </header>
    );
}