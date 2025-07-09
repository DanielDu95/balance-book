import { MonthPicker } from "@/components/ui/monthpicker";

interface Props {
  selectedMonth?: Date;
  onMonthSelect: (month: Date) => void;
}

export function MonthSelector({ selectedMonth, onMonthSelect }: Props) {
  return (
    <MonthPicker
      selectedMonth={selectedMonth}
      onMonthSelect={onMonthSelect}
      className="text-foreground-1 bg-background-1 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
    />
  );
}
