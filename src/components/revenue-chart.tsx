"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { getRevenueData } from "@/lib/actions";
import { paymentTypeLabels, type PaymentType } from "@/server/db/schema";
import { format } from "date-fns";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { es } from "date-fns/locale";
import { Skeleton } from "./ui/skeleton";
import { UTCDate } from "@date-fns/utc";

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function RevenueChart() {
  const [paymentType, setPaymentType] = useState<PaymentType>("all");
  const {
    isPending: isGetRevenueDataPending,
    isError: isGetRevenueDataError,
    data: daily,
  } = useQuery({
    queryKey: ["getRevenueData"],
    queryFn: async () => await getRevenueData(),
  });

  if (isGetRevenueDataPending) {
    return <Skeleton className="col-span-3" />;
  }
  if (isGetRevenueDataError) {
    return <div>An error occurred</div>;
  }
  if (!daily) {
    return <div>No data created</div>;
  }
  // Process data based on selected payment type
  const processedDaily = daily.map((item) => {
    const baseItem = {
      date: new UTCDate(item.date),
    };

    // If a specific payment type is selected, use that amount
    if (paymentType !== "all") {
      return {
        ...baseItem,
        amount: Number(item[paymentType]),
      };
    }

    // Otherwise use the total amount
    return {
      ...baseItem,
      amount:
        Number(item.creditCard) +
        Number(item.debitCard) +
        Number(item.cash) +
        Number(item.moneyTransfer) +
        Number(item.qrCode),
    };
  });

  const dailyChartData = processedDaily.map((item) => ({
    date: format(item.date, "MMM d", { locale: es }),
    amount: item.amount,
  }));
  const handlePaymentTypeChange = (value: string) => {
    setPaymentType(value as PaymentType);
  };

  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Revenue Overview</CardTitle>
          <CardDescription>
            Track your daily and weekly average revenue
          </CardDescription>
        </div>
        <Select value={paymentType} onValueChange={handlePaymentTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select payment type" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(paymentTypeLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={dailyChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar dataKey="amount" fill="var(--color-amount)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
