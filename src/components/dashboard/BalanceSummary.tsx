import { useTransactions } from "@/hooks/useTransactions";

export function BalanceSummary({
  transactions,
}: {
  transactions: ReturnType<typeof useTransactions>["transactions"];
}) {
  const income = transactions
    .filter((t) => t.moneyType === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const outcome = transactions
    .filter((t) => t.moneyType === "outcome")
    .reduce((sum, t) => sum + t.amount, 0);

  const net = income - outcome;

  return (
    <div className="grid grid-rows-3 gap-3 text-sm w-full max-w-full md:w-80 mx-auto md:mx-0">
      {/* Income */}
      <div className="flex items-center justify-between bg-primary-1 px-4 py-3 rounded-xl shadow">
        <span className="text-foreground-1 text-2xl font-bold flex items-center gap-1">
          Income
        </span>
        <span className="text-2xl font-bold text-foreground-1">¥{income}</span>
      </div>

      {/* Outcome */}
      <div className="flex items-center justify-between bg-accent-1 px-4 py-3 rounded-xl shadow">
        <span className="text-foreground-1 flex items-center text-2xl font-bold gap-1">
          Outcome
        </span>
        <span className="text-2xl font-bold text-foreground-1">¥{outcome}</span>
      </div>

      {/* Net */}
      <div className="flex items-center justify-between text-2xl font-bold bg-accent-2 px-4 py-3 rounded-xl shadow">
        <span className="text-foreground-1">Net</span>
        <span className="text-2xl font-bold text-foreground-1">¥{net}</span>
      </div>
    </div>
  );
}
