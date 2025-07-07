import { useState } from "react";
import {
  FaArrowUp,
  FaArrowDown,
  FaChartPie,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// 🔧 Mock Data
const mockSummary = {
  income: 2500,
  outcome: 1200,
};

const mockTransactions = [
  { id: 1, category: "Food", amount: 50, type: "outcome" },
  { id: 2, category: "Salary", amount: 2000, type: "income" },
  { id: 3, category: "Transport", amount: 100, type: "outcome" },
  { id: 4, category: "Freelance", amount: 500, type: "income" },
  { id: 5, category: "Shopping", amount: 150, type: "outcome" },
];

const chartData = [
  { name: "Income", value: mockSummary.income },
  { name: "Outcome", value: mockSummary.outcome },
];

const COLORS = ["#22c55e", "#ef4444"]; // green, red

export default function Dashboard() {
  const net = mockSummary.income - mockSummary.outcome;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      {/* 🧾 Balance Summary */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-green-100 dark:bg-green-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600 dark:text-gray-300">Income</p>
          <p className="text-xl font-semibold text-green-600 dark:text-green-300 flex items-center justify-center gap-1">
            <FaArrowUp /> ¥{mockSummary.income}
          </p>
        </div>
        <div className="bg-red-100 dark:bg-red-800 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600 dark:text-gray-300">Outcome</p>
          <p className="text-xl font-semibold text-red-600 dark:text-red-300 flex items-center justify-center gap-1">
            <FaArrowDown /> ¥{mockSummary.outcome}
          </p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600 dark:text-gray-300">Net</p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white">
            ¥{net}
          </p>
        </div>
      </div>

      {/* 📊 Chart Area */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FaChartPie /> Spending Breakdown
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🧾 Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <ul>
          {mockTransactions.slice(0, 5).map((tx) => (
            <li
              key={tx.id}
              className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700"
            >
              <span className="text-gray-700 dark:text-gray-200">
                {tx.category}
              </span>
              <span
                className={`font-semibold ${
                  tx.type === "income" ? "text-green-500" : "text-red-500"
                }`}
              >
                {tx.type === "income" ? "+" : "-"}¥{tx.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* ⚡ Quick Actions */}
      <div className="flex justify-center gap-6">
        <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-xl shadow transition">
          <FaPlus /> Add Income
        </button>
        <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-2 rounded-xl shadow transition">
          <FaMinus /> Add Outcome
        </button>
      </div>
    </div>
  );
}
