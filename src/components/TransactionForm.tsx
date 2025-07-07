import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { CategorySelector } from "./CategorySelector";
import { useCategories } from "../hooks/useCategories";
import { useTransactions } from "../hooks/useTransactions";
import { useAuthContext } from "../contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

type TransactionFormData = {
  type: "income" | "outcome";
  category: string;
  amount: number;
  remark?: string;
};

export default function TransactionForm() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TransactionFormData>({
    defaultValues: {
      type: "outcome",
    },
  });

  const { user } = useAuthContext();
  const userId = user?.id!;
  const type = watch("type");

  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
    addCategory: addCategoryMutation,
  } = useCategories(userId, type);

  const { addTransaction } = useTransactions(userId);

  const onSubmit = async (data: TransactionFormData) => {
    try {
      await addTransaction({
        moneyType: data.type,
        category: data.category,
        amount: data.amount,
        remark: data.remark || "",
        user_id: userId,
      });

      toast.success("Transaction added!");
      reset({ amount: 0, remark: "", type: type });
    } catch (error) {
      console.error("Insert failed:", error);
      toast.error("Failed to add transaction");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md max-w-md mx-auto"
    >
      <TransactionTypeToggle watch={watch} setValue={setValue} />

      {categoriesLoading ? (
        <p>Loading categories...</p>
      ) : categoriesError ? (
        <p className="text-red-500">Failed to load categories</p>
      ) : (
        <>
          <CategorySelector
            type={type}
            selected={watch("category")}
            setValue={setValue}
            categories={categories}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">Category is required</p>
          )}
        </>
      )}

      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input
          type="number"
          {...register("amount", { required: true, min: 1 })}
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
        />
        {errors.amount?.type === "required" && (
          <p className="text-red-500 text-sm">Amount is required</p>
        )}
        {errors.amount?.type === "min" && (
          <p className="text-red-500 text-sm">Amount must be greater than 0</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Remark</label>
        <input
          type="text"
          {...register("remark")}
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      <button type="submit" className="btn w-full">
        Add Transaction
      </button>
    </form>
  );
}
