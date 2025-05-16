"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { getRevenueData, deleteRevenueItemEntry } from "@/lib/actions";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { es } from "date-fns/locale";
import { Skeleton } from "./ui/skeleton";
import { UTCDate } from "@date-fns/utc";

export function RevenueList() {
  const [entryToDelete, setEntryToDelete] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    isPending: isGetRevenueDataPending,
    isError: isGetRevenueDataError,
    data: daily,
  } = useQuery({
    queryKey: ["getRevenueData"],
    queryFn: async () => await getRevenueData(),
  });
  const queryClient = useQueryClient();

  if (isGetRevenueDataPending) {
    return <Skeleton className="min-h-48 w-full" />;
  }
  if (isGetRevenueDataError) {
    return <div>An error occurred</div>;
  }
  if (!daily) {
    return <div>No data created</div>;
  }
  const entries = daily.map((item) => ({
    id: item.id,
    date: new UTCDate(item.date).toISOString(),
    creditCard: Number(item.creditCard),
    debitCard: Number(item.debitCard),
    moneyTransfer: Number(item.moneyTransfer),
    cash: Number(item.cash),
    qrCode: Number(item.qrCode),
  }));

  const handleDelete = async (id: number) => {
    setIsDeleting(true);
    try {
      const result = await deleteRevenueItemEntry(id);
      if (result.success) {
        await queryClient.invalidateQueries({ queryKey: ["getRevenueData"] });
        toast.success("Entry deleted", {
          description: "Revenue entry has been deleted successfully",
        });
      } else {
        throw new Error(result.error ?? "Failed to delete entry");
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("Error", {
        description: "Failed to delete revenue entry",
      });
    } finally {
      setIsDeleting(false);
      setEntryToDelete(null);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registro de Ingresos</CardTitle>
        <CardDescription>
          Ver y administrar sus registros de ingresos
        </CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length === 0 ? (
          <div className="text-muted-foreground py-4 text-center">
            No revenue entries found
          </div>
        ) : (
          <div className="max-h-[400px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tarjeta de Crédito</TableHead>
                  <TableHead>Tarjeta de Débito</TableHead>
                  <TableHead>Transferencia</TableHead>
                  <TableHead>Efectivo</TableHead>
                  <TableHead>Código QR</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry) => {
                  return (
                    <TableRow key={entry.id}>
                      <TableCell>
                        {format(new UTCDate(entry.date), "MMM dd, yyyy", {
                          locale: es,
                        })}
                      </TableCell>
                      <TableCell>{formatCurrency(entry.creditCard)}</TableCell>
                      <TableCell>{formatCurrency(entry.debitCard)}</TableCell>
                      <TableCell>
                        {formatCurrency(entry.moneyTransfer)}
                      </TableCell>
                      <TableCell>{formatCurrency(entry.cash)}</TableCell>
                      <TableCell>{formatCurrency(entry.qrCode)}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(
                          entry.creditCard +
                            entry.debitCard +
                            entry.moneyTransfer +
                            entry.cash +
                            entry.qrCode,
                        )}
                      </TableCell>
                      <TableCell>
                        <AlertDialog
                          open={entryToDelete === entry.id}
                          onOpenChange={(open) =>
                            !open && setEntryToDelete(null)
                          }
                        >
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setEntryToDelete(entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Revenue Entry
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete the revenue
                                entry for{" "}
                                {format(
                                  new UTCDate(entry.date),
                                  "MMMM dd, yyyy",
                                  {
                                    locale: es,
                                  },
                                )}
                                ? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel disabled={isDeleting}>
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                onClick={async (e) => {
                                  e.preventDefault();
                                  await handleDelete(entry.id);
                                }}
                                disabled={isDeleting}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
