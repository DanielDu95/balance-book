// src/hooks/useTransactions.ts
import { useCallback, useEffect, useState } from "react";
import {
  Transaction,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../services/transactions";

export function useTransactions(userId: string) {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // 🔁 Fetch
  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const transactions = await getTransactions(userId);
      setData(transactions);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // 🔃 Initialize
  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // ➕ Create
  const addTransaction = async (tx: Omit<Transaction, "id" | "created_at">) => {
    const newTx = await createTransaction(tx);
    setData((prev) => [newTx, ...prev]);
    return newTx;
  };

  // ✏️ Update
  const editTransaction = async (id: number, updates: Partial<Transaction>) => {
    const updatedTx = await updateTransaction(id, updates);
    setData((prev) => prev.map((tx) => (tx.id === id ? updatedTx : tx)));
    return updatedTx;
  };

  // ❌ Delete
  const removeTransaction = async (id: number) => {
    await deleteTransaction(id);
    setData((prev) => prev.filter((tx) => tx.id !== id));
  };

  return {
    data,
    loading,
    error,
    addTransaction,
    editTransaction,
    removeTransaction,
    refresh: fetchTransactions,
  };
}
