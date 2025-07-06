import { useMemo } from "react";

export default function AuthBackground() {
  const rows = 16;
  const cols = 6;

  // Create a 2D array for rows and columns
  const wordsGrid = useMemo(() => {
    return Array.from({ length: rows }).map(() =>
      Array.from({ length: cols }).map(() => "Balance Book")
    );
  }, []);

  // Horizontal shifts for lines: center, left, right
  const horizontalShifts = ["0%", "-5%", "5%"];

  return (
    <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col gap-4 px-6 sm:px-10"
        style={{
          transform: "rotate(45deg) translateX(10vw)",
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}
      >
        {wordsGrid.map((row, rowIndex) => {
          // Determine horizontal shift for this row
          const shift = horizontalShifts[rowIndex % horizontalShifts.length];

          return (
            <div
              key={rowIndex}
              className="flex justify-center gap-8"
              style={{ transform: `translateX(${shift}) translateY(-20vw)` }}
            >
              {row.map((word, colIndex) => (
                <span
                  key={colIndex}
                  className="text-gray-400 py-5 dark:text-gray-600 select-none font-semibold whitespace-nowrap"
                  style={{ fontSize: "min(5vw, 2.5rem)", opacity: 0.12 }}
                >
                  {word}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
