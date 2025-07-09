import { FC } from "react";

type Props = {
  id: number;
  name: string;
  Icon: React.ElementType;
  selected: boolean;
  onSelect: (name: string) => void;
};

export const CategoryItem: FC<Props> = ({
  id,
  name,
  Icon,
  selected,
  onSelect,
}) => {
  return (
    <button
      type="button"
      key={id}
      onClick={() => onSelect(name)}
      className="flex flex-col items-center justify-center p-4 transition-colors"
    >
      <div
        className={`flex items-center justify-center rounded-full w-16 h-16 p-2
        ${
          selected
            ? "bg-primary-1 text-foreground-1"
            : "bg-gray-200 text-foreground-1"
        } hover:bg-primary-1 `}
      >
        <Icon size={24} />
      </div>
      <span className="text-sm mt-2">{name}</span>
    </button>
  );
};
