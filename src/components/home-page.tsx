import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  DollarSign,
  BarChart,
  Users,
  CheckCircle2,
} from "lucide-react";

export function HomePage() {
  return (
    <>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="inline-flex bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                    New Dashboard Features
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Track Your Business Revenue With Confidence
                  </h1>
                  <p className="text-muted-foreground max-w-[600px] md:text-xl">
                    Powerful analytics and reporting tools designed specifically
                    for small and medium-sized businesses. Get insights that
                    matter.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Get Started - It's Free
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>100% Free</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Full access to all features</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="bg-background relative h-[400px] w-full overflow-hidden rounded-lg border shadow-xl lg:h-[500px]">
                  <Image
                    src="/placeholder.svg?height=500&width=800"
                    alt="Dashboard Preview"
                    width={800}
                    height={500}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full bg-slate-50 py-12 md:py-24 lg:py-32 dark:bg-slate-900"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-800">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need to track your business revenue
                </h2>
                <p className="text-muted-foreground max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides comprehensive tools to help you monitor,
                  analyze, and grow your business revenue.
                </p>
              </div>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              <Card className="border-none shadow-md">
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <BarChart3 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Real-time Analytics</CardTitle>
                  <CardDescription>
                    Monitor your business performance in real-time with
                    intuitive dashboards.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Live revenue tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Customizable dashboards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Performance alerts</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <LineChart className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Revenue Forecasting</CardTitle>
                  <CardDescription>
                    Predict future revenue trends with our advanced forecasting
                    tools.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>AI-powered predictions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Scenario planning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Trend analysis</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <PieChart className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Financial Reporting</CardTitle>
                  <CardDescription>
                    Generate comprehensive reports for better business
                    decisions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Automated reports</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Export in multiple formats</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Compliance-ready documents</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Expense Tracking</CardTitle>
                  <CardDescription>
                    Monitor all your business expenses in one place.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Receipt scanning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Categorization</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Tax preparation</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <Users className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Team Collaboration</CardTitle>
                  <CardDescription>
                    Work together with your team on financial planning.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Role-based access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Shared dashboards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Activity tracking</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none shadow-md">
                <CardHeader className="space-y-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                    <BarChart className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-xl">Benchmarking</CardTitle>
                  <CardDescription>
                    Compare your performance with industry standards.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="text-muted-foreground space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Industry comparisons</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Competitive analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <span>Performance metrics</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-emerald-600 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to take control of your business revenue?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started today completely free. No credit card required.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  className="bg-white text-emerald-600 hover:bg-gray-100"
                >
                  Get Started - It's Free
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row md:justify-between">
          <div className="flex items-center gap-2 text-xl font-bold">
            <TrendingUp className="h-6 w-6 text-emerald-600" />
            <span>RevenueTracker</span>
          </div>
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <nav className="flex gap-4 md:gap-6">
              <Link
                href="#"
                className="text-muted-foreground text-xs underline-offset-4 hover:underline md:text-sm"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-muted-foreground text-xs underline-offset-4 hover:underline md:text-sm"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-muted-foreground text-xs underline-offset-4 hover:underline md:text-sm"
              >
                Cookies
              </Link>
            </nav>
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} RevenueTracker. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
