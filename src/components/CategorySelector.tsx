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
              className={`flex flex-col items-center justify-center p-4 transition-colors
               `}
            >
              <div
                className={`flex items-center justify-center rounded-full hover:bg-primary w-16 h-16 p-2
                  ${
                    isSelected ? "bg-primary" : "bg-gray-200 dark:bg-gray-600"
                  }`}
              >
                <Icon
                  size={24}
                  className={`${isSelected ? "text-black" : "text-gray-600"}`}
                />
              </div>
              <span className="text-sm mt-2">{label}</span>
            </button>
          );
        })}

        {/* Add Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-center justify-center p-4 rounded-xl  transition"
        >
          <div className="flex items-center justify-center rounded-full w-16 h-16 p-2 bg-gray-200 dark:bg-gray-600 hover:bg-primary">
            <FaPlus size={24} className="text-gray-600 dark:text-gray-300" />
          </div>
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
