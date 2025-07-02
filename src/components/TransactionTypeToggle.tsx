import { UseFormWatch, UseFormSetValue } from "react-hook-form";

type Props = {
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
};

const categories = ["income", "outcome"] as const;

export function TransactionTypeToggle({ watch, setValue }: Props) {
  const type = watch("type");

  return (
    <div className="relative flex items-center justify-between bg-gray-200 dark:bg-gray-700 rounded-full p-1 select-none max-w-xs mx-auto">
      {categories.map((cat) => {
        const isSelected = type === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => setValue("type", cat)}
            className={`flex-1 text-center rounded-full py-2 transition-colors
              ${
                isSelected
                  ? "bg-primary text-black font-semibold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        );
      })}
    </div>
  );
}
