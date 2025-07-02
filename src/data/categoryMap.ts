import {
  FaUtensils,
  FaHome,
  FaBus,
  FaShoppingBag,
  FaMoneyBillWave,
  FaGift,
  FaChartLine,
} from "react-icons/fa";

export const categoryOptions = {
  income: [
    { key: "Salary", label: "Salary", icon: FaMoneyBillWave },
    { key: "Bonus", label: "Bonus", icon: FaGift },
    { key: "Investment", label: "Investment", icon: FaChartLine },
  ],
  outcome: [
    { key: "Food", label: "Food", icon: FaUtensils },
    { key: "Rent", label: "Rent", icon: FaHome },
    { key: "Transport", label: "Transport", icon: FaBus },
    { key: "Shopping", label: "Shopping", icon: FaShoppingBag },
  ],
};
