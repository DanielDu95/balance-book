import { useRef, useState } from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";
import {
  FaUtensils,
  FaHome,
  FaBus,
  FaShoppingBag,
  FaGift,
  FaTag,
  FaChartLine,
  FaMoneyBillWave,
} from "react-icons/fa";

const iconSet = [
  { key: "FaUtensils", icon: FaUtensils },
  { key: "FaHome", icon: FaHome },
  { key: "FaBus", icon: FaBus },
  { key: "FaShoppingBag", icon: FaShoppingBag },
  { key: "FaGift", icon: FaGift },
  { key: "FaChartLine", icon: FaChartLine },
  { key: "FaMoneyBillWave", icon: FaMoneyBillWave },
  { key: "FaTag", icon: FaTag },
];

type Props = {
  type: "income" | "outcome";
  onClose: () => void;
  onAdd: (category: { key: string; label: string; icon: any }) => void;
};

export function AddCategoryModal({ type, onClose, onAdd }: Props) {
  const modalRef = useOutsideClick<HTMLDivElement>(() => {
    onClose();
  });
  const [name, setName] = useState("");
  const [selectedIconKey, setSelectedIconKey] = useState<string>(
    iconSet[0].key
  );

  // Close modal when clicking outside
  const handleSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed) return;

    const selectedIcon = iconSet.find(
      (icon) => icon.key === selectedIconKey
    )?.icon;
    if (selectedIcon) {
      onAdd({ key: trimmed, label: trimmed, icon: selectedIcon });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 p-6 flex flex-col gap-7 rounded-xl w-[90%] max-w-md shadow-lg"
      >
        <h2 className="text-lg font-bold mb-4">Add New {type} Category</h2>

        {/* Icon Selector */}
        <div className="grid grid-cols-6 gap-y-4 ">
          {iconSet.map(({ key, icon: Icon }, idx) => {
            const isSelected = selectedIconKey === key;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedIconKey(key)}
                className={`p-3 rounded-full w-12 h-12 border transition flex justify-center
                  ${
                    isSelected
                      ? "bg-primary text-black border-transparent"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 border-gray-300"
                  }`}
              >
                <Icon size={24} />
              </button>
            );
          })}
        </div>

        {/* Name Input */}
        <input
          type="text"
          value={name}
          placeholder="Category name"
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 rounded-md border px-3 py-2 dark:bg-gray-700 dark:border-gray-600"
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="btn-secondary px-4 py-2 text-sm rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn px-4 py-2 text-sm rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
