import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { CategorySelector } from "./CategorySelector";
import { useCategories } from "../hooks/useCategories";
import { useTransactions } from "../hooks/useTransactions";
import { useAuthContext } from "../contexts/AuthContext";
import { useQueryClient } from "@tanstack/react-query";
import { FaMoneyBillWave, FaStickyNote } from "react-icons/fa";
import Spinner from "./ui/Spinner";

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
      className="space-y-6  bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md max-w-md mx-auto"
    >
      <TransactionTypeToggle watch={watch} setValue={setValue} />

      {categoriesLoading ? (
        <Spinner />
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

      {/* Amount Field */}
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor="amount"
          className="w-24 text-base font-bold text-primary"
        >
          Amount
        </label>
        <div className="relative w-full">
          <input
            id="amount"
            type="number"
            {...register("amount", { required: true, min: 1 })}
            className="w-full rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 pr-10 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            placeholder="Enter amount"
          />
          <FaMoneyBillWave className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      {errors.amount?.type === "required" && (
        <p className="text-red-500 text-sm ml-28">Amount is required</p>
      )}
      {errors.amount?.type === "min" && (
        <p className="text-red-500 text-sm ml-28">
          Amount must be greater than 0
        </p>
      )}

      {/* Remark Field */}
      <div className="flex items-center justify-between gap-4 mt-4">
        <label
          htmlFor="remark"
          className="w-24 text-base font-bold text-primary"
        >
          Remark
        </label>
        <div className="relative w-full">
          <input
            id="remark"
            type="text"
            {...register("remark")}
            className="w-full rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 pr-10 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
            placeholder="Optional description"
          />
          <FaStickyNote className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <button
        type="submit"
        className="btn w-3/5 h-10 rounded-full mx-auto block"
      >
        Add Transaction
      </button>
    </form>
  );
}
