// src/hooks/useTransactions.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Transaction,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactions";
import { useAuthContext } from "@/contexts/AuthContext";

export function useTransactions() {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const userId = user?.id;

  // 🔁 Fetch transactions
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useQuery<Transaction[], Error>({
    queryKey: ["transactions", userId],
    queryFn: () => getTransactions(userId),
    enabled: !!userId,
  });

  // ➕ Create transaction
  const { mutateAsync: addTransaction } = useMutation({
    mutationFn: (tx: Omit<Transaction, "id" | "created_at">) =>
      createTransaction(tx),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
    },
  });

  // ✏️ Update transaction
  const { mutateAsync: editTransaction } = useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<Transaction>;
    }) => updateTransaction(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
    },
  });

  // ❌ Delete transaction
  const { mutateAsync: removeTransaction } = useMutation({
    mutationFn: (id: number) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions", userId] });
    },
  });

  return {
    transactions,
    loading: isLoading,
    error: isError ? (error as Error) : null,
    addTransaction,
    editTransaction: (id: number, updates: Partial<Transaction>) =>
      editTransaction({ id, updates }),
    removeTransaction,
    refresh: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions", userId] }),
  };
}
// This hook provides a simple interface for managing transactions, including fetching, adding, updating, and deleting transactions.
