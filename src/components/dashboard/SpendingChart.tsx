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

// 🔹 Shared color function
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    Food: "var(--color-accent-1)",
    Shopping: "var(--color-accent-2)",
    Transport: "var(--color-primary-1)",
    Salary: "var(--color-muted-1)",
    Other: "var(--color-muted-1)",
  };
  return colorMap[category] || "var(--color-muted-1)";
}

// 🔹 Generate chart data grouped by category
function prepareChartData(
  transactions: ReturnType<typeof useTransactions>["transactions"],
  type: "income" | "outcome"
) {
  return transactions
    .filter((t) => t.moneyType === type)
    .reduce((acc, t) => {
      const existing = acc.find((item) => item.category === t.category);
      if (existing) {
        existing.amount += t.amount;
      } else {
        acc.push({
          category: t.category,
          amount: t.amount,
          fill: getCategoryColor(t.category),
        });
      }
      return acc;
    }, [] as { category: string; amount: number; fill: string }[]);
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
