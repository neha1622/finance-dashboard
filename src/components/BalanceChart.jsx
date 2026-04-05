import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
  Legend
} from "recharts";

export default function BalanceChart({ transactions = [], darkMode }){

  // ✅ EMPTY STATE
  if (!transactions || transactions.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
        <h3>📈 No Data</h3>
        <p>Add transactions to see trend</p>
      </div>
    );
  }
    
  // ✅ SAFE SORT (FIX CRASH)
  const sorted = [...transactions]
    .filter((t) => t.date) // remove invalid
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let balance = 0;
  const axisColor = darkMode ? "#e5e7eb" : "#374151";

  const data = sorted.map((t) => {
    const amount = Number(t.amount || 0);

    balance += t.type === "income" ? amount : -amount;

    return {
      date: t.date,
      balance,
    };
  });

  // ✅ ZERO DATA CASE
  if (data.length === 0 || data.every((d) => d.balance === 0)) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
        <h3>📉 No Meaningful Data</h3>
        <p>Add income or expense to see trend</p>
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          
          {/* ✅ GRADIENT */}
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>

          {/* ✅ GRID */}
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* ✅ AXIS */}
         <XAxis dataKey="date" stroke={axisColor} />
<YAxis stroke={axisColor} />

          {/* ✅ TOOLTIP */}
          <Tooltip
            contentStyle={{
              background: "#fff",
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          {/* ✅ LEGEND */}
          <Legend wrapperStyle={{ fontSize: "14px" }} />

          {/* ✅ AREA */}
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#colorBalance)"
            strokeWidth={3}
            animationDuration={500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}