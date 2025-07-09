import TransactionForm from "../components/TransactionForm";
import { getCategories } from "../services/categories";

export default function TransactionsPage() {
  return (
    <div className="p-4">
      <TransactionForm />
    </div>
  );
}
