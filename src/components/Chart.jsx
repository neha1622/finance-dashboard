import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Chart({ transactions = [] }) {
  
  // ✅ EMPTY DATA
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
        <h3>📊 No Data Available</h3>
        <p>Add transactions to see spending insights</p>
      </div>
    );
  }

  // ✅ SAFE CALCULATION
  const income = transactions
    .filter((t) => (t.type || "").toLowerCase() === "income")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  const expense = transactions
    .filter((t) => (t.type || "").toLowerCase() === "expense")
    .reduce((acc, t) => acc + Number(t.amount || 0), 0);

  // ✅ ZERO CASE
  if (income === 0 && expense === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
        <h3>📉 No Meaningful Data</h3>
        <p>Add income or expense to visualize chart</p>
      </div>
    );
  }

  // ✅ REMOVE ZERO VALUES (PREVENT PIE BUG)
  const data = [
    income > 0 && { name: "Income", value: income },
    expense > 0 && { name: "Expense", value: expense },
  ].filter(Boolean);

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={95}
            paddingAngle={5}
            animationDuration={500}
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>

          {/* ✅ TOOLTIP SAFE */}
          <Tooltip
            formatter={(value) => `₹${value}`}
            contentStyle={{
              background: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          {/* ✅ LEGEND */}
          <Legend
            verticalAlign="bottom"
            wrapperStyle={{
              fontSize: "14px",
              marginTop: "10px",
            }}
          />

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}