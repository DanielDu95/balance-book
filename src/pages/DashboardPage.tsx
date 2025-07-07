import { useState } from "react";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { BalanceSummary } from "@/components/dashboard/BalanceSummary";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { Transaction } from "@/services/transactions";

// 🧪 Replace with real data in future
const mockSummary = {
  income: 200,
  outcome: 1200,
};

const mockTransactions: Transaction[] = [
  {
    id: 1,
    category: "Food",
    amount: 50,
    moneyType: "outcome",
    user_id: "mock",
  },
  {
    id: 2,
    category: "Salary",
    amount: 2000,
    moneyType: "income",
    user_id: "mock",
  },
  // ...
];

export default function DashboardPage() {
  const [month, setMonth] = useState<Date>();
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <MonthSelector selectedMonth={month} onMonthSelect={setMonth} />
        <BalanceSummary
          income={mockSummary.income}
          outcome={mockSummary.outcome}
        />
      </div>

      <SpendingChart
        income={mockSummary.income}
        outcome={mockSummary.outcome}
      />
      <RecentTransactions transactions={mockTransactions} />
    </div>
  );
}
