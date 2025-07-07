import { Transaction } from "@/services/transactions";

interface Props {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
      <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
      <ul>
        {transactions.slice(0, 5).map((tx) => (
          <li
            key={tx.id}
            className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"
          >
            <span className="text-gray-700 dark:text-gray-200">
              {tx.category}
            </span>
            <span
              className={`font-semibold ${
                tx.moneyType === "income" ? "text-green-500" : "text-red-500"
              }`}
            >
              {tx.moneyType === "income" ? "+" : "-"}¥{tx.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
