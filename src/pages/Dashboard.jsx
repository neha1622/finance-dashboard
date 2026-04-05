import { useState, useEffect } from "react";
import SummaryCards from "../components/SummaryCards";
import TransactionList from "../components/TransactionList";
import Chart from "../components/Chart";
import AddTransaction from "../components/AddTransaction";
import BalanceChart from "../components/BalanceChart";
import AIInsights from "../components/AIInsights";
import GoalTracker from "../components/GoalTracker";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

export default function Dashboard() {

  const [transactions, setTransactions] = useState([]);
  const [activePage, setActivePage] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(false);

  const [filters, setFilters] = useState({
    type: "all",
    search: "",
    minAmount: "",
    startDate: "",
    endDate: "",
  });

  const [selectedRole, setSelectedRole] = useState("admin");
  const [darkMode, setDarkMode] = useState(false);

  const textPrimary = darkMode ? "#f9fafb" : "#111827";

  const glassStyle = {
    background: darkMode
      ? "rgba(30,41,59,0.8)"
      : "rgba(255,255,255,0.85)",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    borderRadius: "12px",
    border: darkMode
      ? "1px solid rgba(255,255,255,0.1)"
      : "1px solid rgba(0,0,0,0.05)",
  };

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    } else {
      setTransactions([
        { title: "Salary", amount: 5000, type: "income", date: "2026-04-01" },
        { title: "Groceries", amount: 1000, type: "expense", date: "2026-04-02" },
        { title: "Shopping", amount: 1500, type: "expense", date: "2026-04-03" },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const filteredTransactions = transactions.filter((t) => {
    return (
      (filters.type === "all" || t.type === filters.type) &&
      t.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      (!filters.minAmount || t.amount >= Number(filters.minAmount)) &&
      (!filters.startDate || new Date(t.date) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(t.date) <= new Date(filters.endDate))
    );
  });

  const handleDelete = (item) => {
    setTransactions((prev) => prev.filter((t) => t !== item));
  };

  const handleExport = () => {
    if (!transactions.length) {
      alert("No data to export");
      return;
    }

    const csv = [
      "Date,Title,Amount,Type",
      ...transactions.map(
        (t) => `${t.date},${t.title},${t.amount},${t.type}`
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "finance.csv";
    a.click();
  };

  const cardStyle = {
    ...glassStyle,
    padding: "20px",
    color: textPrimary,
    marginBottom: "15px",
    boxShadow: darkMode
      ? "0 10px 30px rgba(0,0,0,0.5)"
      : "0 10px 25px rgba(0,0,0,0.1)",
    transition: "all 0.2s ease",
  };

  const btnStyle = {
    padding: "8px 14px",
    borderRadius: "6px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    cursor: "pointer",
    marginRight: "10px",
    transition: "0.2s",
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: darkMode
          ? "linear-gradient(135deg, #0f172a, #1e293b)"
          : "linear-gradient(135deg, #1d2b64, #f8cdda)",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          width: showSidebar ? "200px" : "0px",
          background: "#1e293b",
          color: "#fff",
          padding: showSidebar ? "20px" : "0px",
          overflow: "hidden",
          transition: "0.3s",
          zIndex: 1000,
        }}
      >
        <h2 style={{ textAlign: "center" }}>💰 FinTrack</h2>

        {["overview", "transactions", "insights"].map((item) => (
          <div
            key={item}
            onClick={() => {
              setActivePage(item);
              setShowSidebar(false);
            }}
            style={{
              padding: "12px",
              marginTop: "10px",
              cursor: "pointer",
              borderRadius: "8px",
              background:
                activePage === item ? "#334155" : "transparent",
            }}
          >
            {item.toUpperCase()}
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginLeft: showSidebar ? "200px" : "0px",
          transition: "0.3s",
        }}
      >
        <button style={btnStyle} onClick={() => setShowSidebar(!showSidebar)}>
          ☰ Menu
        </button>

        <button style={btnStyle} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button style={btnStyle} onClick={handleExport}>
          ⬇ Export
        </button>

        {/* TRANSACTIONS */}
        {activePage === "transactions" && (
          <>
            <h2 style={{ color: textPrimary }}>Transactions</h2>

            <div style={{ marginBottom: "10px" }}>
              <label style={{ color: textPrimary }}>Role: </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="viewer">Viewer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {selectedRole === "admin" && (
              <div style={cardStyle}>
                <AddTransaction
                  setTransactions={setTransactions}
                  darkMode={darkMode}
                />
              </div>
            )}

            <div style={cardStyle}>
              <TransactionList
                transactions={filteredTransactions}
                onDelete={selectedRole === "admin" ? handleDelete : null}
              />
            </div>
          </>
        )}

        {/* OVERVIEW */}
        {activePage === "overview" && (
          <>
            <h2 style={{ color: textPrimary }}>Dashboard Overview</h2>

            <SummaryCards transactions={transactions} />

            <div style={cardStyle}>
              <h3 style={{ color: textPrimary }}>📈 Balance Trend</h3>
              <BalanceChart transactions={transactions} darkMode={darkMode} />
            </div>

            <div style={cardStyle}>
              <h3 style={{ color: textPrimary }}>📊 Spending Breakdown</h3>
              <Chart transactions={transactions} darkMode={darkMode} />
            </div>
          </>
        )}

        {/* INSIGHTS */}
        {activePage === "insights" && (
          <>
            <h2 style={{ color: textPrimary }}>Insights</h2>

            <div style={cardStyle}>
              <AIInsights transactions={transactions} />
            </div>

            <div style={cardStyle}>
              <h3 style={{ color: textPrimary }}>📅 Monthly Expense Comparison</h3>

              {(() => {
                const monthly = {};

                transactions.forEach((t) => {
                  const month = t.date.slice(0, 7);
                  if (!monthly[month]) monthly[month] = 0;
                  if (t.type === "expense") monthly[month] += t.amount;
                });

                const data = Object.entries(monthly).map(([month, value]) => ({
                  month,
                  expense: value,
                }));

                return data.length === 0 ? (
                  <p style={{ color: "#6b7280" }}>No expense data</p>
                ) : (
                  <div style={{ width: "100%", height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" stroke={textPrimary} />
                        <YAxis stroke={textPrimary} />
                        <Tooltip
                          contentStyle={{
                            background: "#fff",
                            borderRadius: "8px",
                            border: "none",
                          }}
                        />
                        <Bar
                          dataKey="expense"
                          fill="#ef4444"
                          radius={[6, 6, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                );
              })()}
            </div>

            <div style={cardStyle}>
              <GoalTracker transactions={transactions} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}