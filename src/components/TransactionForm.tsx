import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { TransactionTypeToggle } from "./TransactionTypeToggle";
import { CategorySelector } from "./CategorySelector";

const categories = {
  income: ["Salary", "Bonus", "Investment"],
  outcome: ["Food", "Rent", "Transport", "Shopping"],
};

type TransactionFormData = {
  type: "income" | "outcome";
  category: string;
  amount: number;
  remark?: string;
};

export default function TransactionForm() {
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

  const type = watch("type");

  const onSubmit = (data: TransactionFormData) => {
    console.log("Submitting:", data);
    // TODO: Save to Supabase
    toast.success("Transaction added!");
    reset({ type: "income" }); // reset to default
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md max-w-md mx-auto"
    >
      {/* Type Toggle */}
      <TransactionTypeToggle watch={watch} setValue={setValue} />

      <CategorySelector
        type={type}
        selected={watch("category")}
        setValue={setValue}
      />
      {errors.category && (
        <p className="text-red-500 text-sm">Category is required</p>
      )}

      {/* Amount */}
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

      {/* Remark */}
      <div>
        <label className="block mb-1 font-medium">Remark</label>
        <input
          type="text"
          {...register("remark")}
          className="w-full rounded-md border px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
        />
      </div>

      {/* Submit */}
      <button type="submit" className="btn w-full">
        Add Transaction
      </button>
    </form>
  );
}
