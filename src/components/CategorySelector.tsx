import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FaPlus, FaTag } from "react-icons/fa";
import { AddCategoryModal } from "./AddCategoryModal";
import { categoryOptions } from "../data/categoryMap";

type Props = {
  type: "income" | "outcome";
  selected: string;
  setValue: UseFormSetValue<any>;
};

export function CategorySelector({ type, selected, setValue }: Props) {
  const [customCategories, setCustomCategories] = useState<
    { key: string; label: string; icon: any }[]
  >([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultCategories = categoryOptions[type];
  const allCategories = [...defaultCategories, ...customCategories];

  const handleAdd = (newCategory: {
    key: string;
    label: string;
    icon: any;
  }) => {
    setCustomCategories((prev) => [...prev, newCategory]);
    setValue("category", newCategory.key);
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {allCategories.map(({ key, label, icon: Icon }) => {
          const isSelected = selected === key;

          return (
            <button
              type="button"
              key={key}
              onClick={() => setValue("category", key)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl transition-colors border
                ${
                  isSelected
                    ? "bg-primary text-black border-transparent"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300"
                }`}
            >
              <Icon size={24} />
              <span className="text-sm mt-2">{label}</span>
            </button>
          );
        })}

        {/* Add Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-center justify-center p-4 rounded-xl border border-dashed border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          <FaPlus size={24} />
          <span className="text-sm mt-2">Add</span>
        </button>
      </div>

      {isModalOpen && (
        <AddCategoryModal
          type={type}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAdd}
        />
      )}
    </div>
  );
}
