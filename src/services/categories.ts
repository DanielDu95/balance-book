import { supabase } from "../lib/supabase";

export type Category = {
  id: number;
  name: string;
  categoryType: "income" | "outcome";
  icon: string;
  user_id: string;
};

// Fetch all categories for a user and a specific type
export async function getCategories(
  userId: string,
  type: "income" | "outcome"
): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("user_id", userId)
    .eq("categoryType", type)
    .order("id", { ascending: true });

  if (error) throw new Error(error.message);
  return data;
}

// Add a new category
export async function addCategory(
  userId: string,
  category: {
    name: string;
    categoryType: "income" | "outcome";
    icon: string;
  }
): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .insert([{ ...category, user_id: userId }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Update category by ID
export async function updateCategory(
  id: number,
  updates: {
    name?: string;
    icon?: string;
  }
): Promise<Category> {
  const { data, error } = await supabase
    .from("categories")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

// Delete category by ID
export async function deleteCategory(id: number): Promise<void> {
  const { error } = await supabase.from("categories").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
