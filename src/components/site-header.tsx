import { TrendingUp } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import UserButton from "./user-button";

export function SiteHeader() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2 text-xl font-bold">
          <TrendingUp className="h-6 w-6 text-emerald-600" />
          <span>RevenueTracker</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ThemeToggle />
            <UserButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
