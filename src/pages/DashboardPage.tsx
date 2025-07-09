import { useState } from "react";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { BalanceSummary } from "@/components/dashboard/BalanceSummary";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { useTransactions } from "@/hooks/useTransactions";

export default function DashboardPage() {
  const [month, setMonth] = useState<Date>();
  const { transactions: unsortedTransactions } = useTransactions();

  // Sort transactions (newest first)
  const sortedTransactions = unsortedTransactions.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Filter by selected month
  const filteredTransactions = month
    ? sortedTransactions.filter((tx) => {
        const txDate = new Date(tx.created_at);
        return (
          txDate.getFullYear() === month.getFullYear() &&
          txDate.getMonth() === month.getMonth()
        );
      })
    : sortedTransactions;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="w-full flex justify-center md:justify-start">
          <MonthSelector selectedMonth={month} onMonthSelect={setMonth} />
        </div>

        <div className="flex justify-center px-10 md:justify-end md:p-0">
          <BalanceSummary transactions={filteredTransactions} />
        </div>
      </div>

      <SpendingChart transactions={filteredTransactions} />
      <RecentTransactions transactions={filteredTransactions} />
    </div>
  );
}
