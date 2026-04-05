import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function Charts({ transactions }) {
  const data = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      data[t.category] = (data[t.category] || 0) + t.amount;
    }
  });

  const chartData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key],
  }));

  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      <h2 className="font-bold mb-2">Spending Breakdown</h2>
      <PieChart width={300} height={200}>
        <Pie data={chartData} dataKey="value" outerRadius={80}>
          {chartData.map((_, index) => (
            <Cell key={index} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}