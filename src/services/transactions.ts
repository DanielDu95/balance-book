import { supabase } from "../lib/supabase";

export type Transaction = {
  id: number;
  created_at?: string;
  moneyType: "income" | "outcome";
  category: string;
  amount: number;
  remark?: string;
  user_id: string;
};

// Hardcoded for now – replace with Supabase auth user later
const hardcodedUserId = "2affd0d3-e027-40ac-a53e-9f8ee70130ca";

// 🟢 Create
export async function createTransaction(
  data: Omit<Transaction, "id" | "created_at">
) {
  const { error, data: result } = await supabase
    .from("records")
    .insert([data])
    .select();
  if (error) throw error;
  return result?.[0];
}

// 🔵 Read (get all by user)
export async function getTransactions(userId: string = hardcodedUserId) {
  const { data, error } = await supabase
    .from("records")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data as Transaction[];
}

// 🟡 Update
export async function updateTransaction(
  id: number,
  updates: Partial<Transaction>
) {
  const { data, error } = await supabase
    .from("records")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw error;
  return data?.[0];
}

// 🔴 Delete
export async function deleteTransaction(id: number) {
  const { error } = await supabase.from("records").delete().eq("id", id);
  if (error) throw error;
}
