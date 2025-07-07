import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FaPlus, FaTag } from "react-icons/fa";
import { AddCategoryModal } from "./AddCategoryModal";
import { iconMap } from "../data/iconMap";
import { CategoryItem } from "./CategoryItem";

type Props = {
  type: "income" | "outcome";
  selected: string;
  setValue: UseFormSetValue<any>;
  categories: { id: number; name: string; icon: string }[];
};

export function CategorySelector({
  type,
  selected,
  setValue,
  categories,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative max-h-96 overflow-y-auto">
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {categories.map(({ id, name, icon }) => {
          const Icon = iconMap[icon] ?? FaTag;
          return (
            <CategoryItem
              key={id}
              id={id}
              name={name}
              Icon={Icon}
              selected={selected === name}
              onSelect={(name) => setValue("category", name)}
            />
          );
        })}

        {/* Add Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex flex-col items-center justify-center p-4 transition"
        >
          <div className="flex items-center justify-center rounded-full w-16 h-16 p-2 bg-gray-200 dark:bg-gray-600 hover:bg-primary">
            <FaPlus size={24} className="text-gray-600 dark:text-gray-300" />
          </div>
          <span className="text-sm mt-2">Add</span>
        </button>
      </div>

      {isModalOpen && (
        <AddCategoryModal type={type} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
