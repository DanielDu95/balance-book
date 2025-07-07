import { MonthPicker } from "@/components/ui/monthpicker";

interface Props {
  selectedMonth?: Date;
  onMonthSelect: (month: Date) => void;
}

export function MonthSelector({ selectedMonth, onMonthSelect }: Props) {
  return (
    <MonthPicker selectedMonth={selectedMonth} onMonthSelect={onMonthSelect} />
  );
}
