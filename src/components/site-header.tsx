import { TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import ThemeToggle from "./theme-toggle";

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
            <Button variant="outline" size="sm" className="ml-4">
              Log in
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
              Sign up
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
