import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TransactionList({ transactions = [], onDelete }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  const filtered = transactions
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) =>
      filter === "all" ? true : t.type === filter
    )
    .sort((a, b) =>
      sortBy === "amount"
        ? b.amount - a.amount
        : new Date(b.date) - new Date(a.date)
    );

  // ✅ BETTER EMPTY STATE
  if (filtered.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#6b7280",
        }}
      >
        📭 No transactions found  
        <br />
        <small>Try adding or adjusting filters</small>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "10px" }}>
      {/* 🔍 FILTERS */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "12px",
          flexWrap: "wrap",
        }}
      >
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "6px 10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "rgba(255,255,255,0.7)",
            color: "#111827",
          }}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "rgba(255,255,255,0.7)",
          }}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            background: "rgba(255,255,255,0.7)",
          }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>

      {/* ✅ ANIMATED LIST */}
      <AnimatePresence>
        {filtered.map((t) => (
          <motion.div
            key={t.date + t.title + t.amount}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "rgba(255,255,255,0.9)",
              color: "#111827",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div>
              <strong>{t.title}</strong>{" "}
              
              {/* ✅ TYPE BADGE */}
              <span
                style={{
                  marginLeft: "6px",
                  padding: "2px 6px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  background:
                    t.type === "income"
                      ? "rgba(34,197,94,0.2)"
                      : "rgba(239,68,68,0.2)",
                  color:
                    t.type === "income"
                      ? "#16a34a"
                      : "#dc2626",
                }}
              >
                {t.type}
              </span>

              <br />
              <span style={{ fontSize: "12px", color: "#374151" }}>
                {t.date}
              </span>
            </div>

            {/* ✅ AMOUNT COLOR */}
            <div
              style={{
                fontWeight: "600",
                color: t.type === "income" ? "#16a34a" : "#dc2626",
              }}
            >
              ₹{t.amount}
            </div>

            {/* ✅ DELETE BUTTON POLISH */}
            <button
              onClick={() => onDelete(t)}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "6px",
                cursor: "pointer",
                transition: "0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Delete
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}