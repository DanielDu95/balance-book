import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useTransactions } from "@/hooks/useTransactions";

// 🔹 Repeating chart colors
const chartColors = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];

// 🔹 Generate chart data grouped by category with repeating colors
function prepareChartData(
  transactions: ReturnType<typeof useTransactions>["transactions"],
  type: "income" | "outcome"
) {
  const categoryMap = new Map<string, { category: string; amount: number }>();

  transactions
    .filter((t) => t.moneyType === type)
    .forEach((t) => {
      const existing = categoryMap.get(t.category);
      if (existing) {
        existing.amount += t.amount;
      } else {
        categoryMap.set(t.category, { category: t.category, amount: t.amount });
      }
    });

  // Assign color by index, cycle through the predefined chartColors
  return Array.from(categoryMap.values()).map((item, index) => ({
    ...item,
    fill: chartColors[index % chartColors.length],
  }));
}

// 🔹 Generate chart config object
function generateChartConfig(data: { category: string; fill: string }[]) {
  return Object.fromEntries(
    data.map((d) => [d.category, { label: d.category, color: d.fill }])
  );
}

export function SpendingChart({
  transactions,
}: {
  transactions: ReturnType<typeof useTransactions>["transactions"];
}) {
  const outcomeData = prepareChartData(transactions, "outcome");
  const incomeData = prepareChartData(transactions, "income");

  const outcomeConfig = generateChartConfig(outcomeData);
  const incomeConfig = generateChartConfig(incomeData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Outcome Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Outcome by Category</CardTitle>
          <CardDescription>This Month</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={outcomeConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={outcomeData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Spending trends <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total outcome by category
          </div>
        </CardFooter>
      </Card>

      {/* Income Chart */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Income by Category</CardTitle>
          <CardDescription>This Month</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={incomeConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={incomeData}
                dataKey="amount"
                nameKey="category"
                innerRadius={60}
                strokeWidth={5}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <Sector {...props} outerRadius={outerRadius + 10} />
                )}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 leading-none font-medium">
            Income trends <TrendingUp className="h-4 w-4" />
          </div>
          <div className="text-muted-foreground leading-none">
            Showing total income by category
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
