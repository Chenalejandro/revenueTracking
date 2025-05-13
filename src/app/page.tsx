import { RevenueForm } from "@/components/revenue-form";
import { RevenueChart } from "@/components/revenue-chart";
import { RevenueList } from "@/components/revenue-list";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Revenue Dashboard</h1>

      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <RevenueChart />
        <div className="md:col-span-1">
          <RevenueForm />
        </div>
      </div>

      <div className="mt-8">
        <RevenueList />
      </div>

      <Toaster />
    </main>
  );
}
