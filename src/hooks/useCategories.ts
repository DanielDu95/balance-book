import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  Category,
} from "../services/categories";

export function useCategories(userId: string, type: "income" | "outcome") {
  const queryClient = useQueryClient();

  const queryKey = ["categories", userId, type];

  // Fetch categories
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => getCategories(userId, type),
    enabled: !!userId, // only run when userId exists
  });

  // Add category
  const add = useMutation({
    mutationFn: (newCategory: { name: string; icon: string }) =>
      addCategory(userId, { ...newCategory, categoryType: type }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // Update category
  const update = useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Category> }) =>
      updateCategory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // Delete category
  const remove = useMutation({
    mutationFn: (id: number) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    categories: data || [],
    isLoading,
    error,
    addCategory: add.mutate,
    updateCategory: update.mutate,
    deleteCategory: remove.mutate,
  };
}
