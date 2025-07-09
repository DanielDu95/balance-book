import { useTransactions } from "@/hooks/useTransactions";
import { TransactionItem } from "@/components/dashboard/TransactionItem";

export function RecentTransactions({
  transactions,
}: {
  transactions: ReturnType<typeof useTransactions>["transactions"];
}) {
  const { removeTransaction } = useTransactions();

  const handleDelete = (id: number) => {
    removeTransaction(id); // Ensure this function exists in your hook
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <ul>
        {transactions.slice(0, 5).map((tx) => (
          <TransactionItem
            key={tx.id}
            id={tx.id}
            category={tx.category}
            moneyType={tx.moneyType}
            amount={tx.amount}
            date={tx.created_at} // or whatever your date field is
            onDelete={handleDelete}
            remark={tx.remark} // Assuming you have a remark field
          />
        ))}
      </ul>
    </div>
  );
}
