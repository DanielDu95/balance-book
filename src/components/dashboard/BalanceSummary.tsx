import { FaArrowUp, FaArrowDown } from "react-icons/fa";

interface Props {
  income: number;
  outcome: number;
}

export function BalanceSummary({ income, outcome }: Props) {
  const net = income - outcome;

  return (
    <div className="grid grid-rows-3 gap-3 text-sm w-full md:w-72">
      {/* Income */}
      <div className="flex items-center justify-between bg-green-100 dark:bg-green-800 px-4 py-3 rounded-xl shadow">
        <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <FaArrowUp className="text-green-500 dark:text-green-300" />
          Income
        </span>
        <span className="text-2xl font-bold text-green-600 dark:text-green-300">
          ¥{income}
        </span>
      </div>

      {/* Outcome */}
      <div className="flex items-center justify-between bg-red-100 dark:bg-red-800 px-4 py-3 rounded-xl shadow">
        <span className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
          <FaArrowDown className="text-red-500 dark:text-red-300" />
          Outcome
        </span>
        <span className="text-2xl font-bold text-red-600 dark:text-red-300">
          ¥{outcome}
        </span>
      </div>

      {/* Net */}
      <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 px-4 py-3 rounded-xl shadow">
        <span className="text-gray-600 dark:text-gray-300">Net</span>
        <span className="text-2xl font-bold text-gray-800 dark:text-white">
          ¥{net}
        </span>
      </div>
    </div>
  );
}
