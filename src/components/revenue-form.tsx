"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { addRevenue } from "@/lib/actions";
import { useQueryClient } from "@tanstack/react-query";
import { es } from "date-fns/locale";

const FormSchema = z.object({
  date: z.date(),
  // FIXME: We don't want to use coerce chttps://github.com/shadcn-ui/ui/issues/3981
  creditCard: z.coerce.number().gte(0).lte(1000000).optional(),
  debitCard: z.coerce.number().gte(0).lte(1000000).optional(),
  moneyTransfer: z.coerce.number().gte(0).lte(1000000).optional(),
  cash: z.coerce.number().gte(0).lte(1000000).optional(),
  qrCode: z.coerce.number().gte(0).lte(1000000).optional(),
  billing: z.coerce.number().gte(0).lte(1000000).optional(),
});

export function RevenueForm() {
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
      // FIXME: It seems difficult to add a placeholder while maintaining the controlled input state
      creditCard: 0,
      debitCard: 0,
      moneyTransfer: 0,
      cash: 0,
      qrCode: 0,
      billing: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const formattedData = {
      creditCard: data.creditCard ?? 0,
      debitCard: data.debitCard ?? 0,
      moneyTransfer: data.moneyTransfer ?? 0,
      cash: data.cash ?? 0,
      qrCode: data.qrCode ?? 0,
      billing: data.billing ?? 0,
    };

    const totalAmount =
      formattedData.creditCard +
      formattedData.debitCard +
      formattedData.moneyTransfer +
      formattedData.cash +
      formattedData.qrCode;

    if (totalAmount <= 0) {
      toast.error("Invalid amount", {
        description: "Please enter at least one payment amount",
      });
      return;
    }

    const result = await addRevenue(formattedData, data.date);
    if (result.success) {
      await queryClient.invalidateQueries({ queryKey: ["getRevenueData"] });
      toast.success("Revenue added", {
        description: `$${totalAmount.toFixed(2)} has been added for ${format(data.date, "MMM dd, yyyy")}`,
      });
    } else {
      throw new Error(result.error ?? "Failed to add revenue");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Dia</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={es}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("2020-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="creditCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tarjeta de credito</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>Este es</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="debitCard"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tarjeta de debito</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>Este es</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="moneyTransfer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transferencia</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormDescription>Este es</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cash"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Efectivo</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>Este es</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="qrCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>QR</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>Este es</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billing"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Facturación</FormLabel>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
              <FormDescription>Este es</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
