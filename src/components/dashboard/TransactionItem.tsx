import { useState } from "react";
import { format } from "date-fns";
import { MoreVertical } from "lucide-react"; // You can use this or FaEllipsisV from react-icons
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type TransactionItemProps = {
  id: number;
  category: string;
  moneyType: "income" | "outcome";
  amount: number;
  date: string;
  onDelete: (id: number) => void;
  remark?: string; // Optional remark field
};

export function TransactionItem({
  id,
  category,
  moneyType,
  amount,
  date,
  onDelete,
  remark,
}: TransactionItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <li className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700">
      <div>
        <p className="text-gray-700 dark:text-gray-200">{category}</p>
        <p className="text-sm text-gray-500">
          {format(new Date(date), "yyyy-MM-dd")}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`font-semibold ${
            moneyType === "income" ? "text-accent-2" : "text-accent-1"
          }`}
        >
          {moneyType === "income" ? "+" : "-"}¥{amount}
        </span>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="text-gray-500 hover:text-gray-700 dark:hover:text-white">
              <MoreVertical size={18} />
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Transaction</DialogTitle>
            </DialogHeader>
            {remark && (
              <p className="text-sm text-gray-500 mb-2">remark:{remark}</p>
            )}
            <p>Are you sure you want to delete this transaction?</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  onDelete(id);
                  setOpen(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </li>
  );
}
