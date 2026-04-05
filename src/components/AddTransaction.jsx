import { useState, useRef } from "react";

export default function AddTransaction({ setTransactions, darkMode }) {

  // ✅ PRELOAD AUDIO (IMPORTANT FIX)
  const incomeSound = useRef(new Audio("/income.mp3"));
  const expenseSound = useRef(new Audio("/expense.mp3"));

  const playSound = (type) => {
    try {
      const audio = type === "income" ? incomeSound.current : expenseSound.current;
      audio.currentTime = 0;
      audio.play().catch((err) => console.log("Sound blocked:", err));
    } catch (error) {
      console.log("Sound error:", error);
    }
  };

  const textPrimary = darkMode ? "#f9fafb" : "#111827";
  const textSecondary = darkMode ? "#d1d5db" : "#374151";

  const glassStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "15px",
  };

  const inputStyle = {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "rgba(255,255,255,0.8)",
    color: "#111827",
  };

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");

  const [titleError, setTitleError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    setTitleError("");
    setAmountError("");

    if (!title.trim()) {
      setTitleError("Title is required");
      valid = false;
    }

    if (!amount) {
      setAmountError("Amount is required");
      valid = false;
    } else if (isNaN(amount)) {
      setAmountError("Only numbers allowed");
      valid = false;
    } else if (Number(amount) <= 0) {
      setAmountError("Amount must be greater than 0");
      valid = false;
    }

    if (!valid) return;

    const newTransaction = {
      title,
      amount: Number(amount),
      type: type.toLowerCase(),
      date: new Date().toISOString().split("T")[0],
    };

    setTransactions((prev) => [...prev, newTransaction]);

    // 🔊 PLAY SOUND (NOW WORKS)
    playSound(type);

    // ✅ SUCCESS UI
    setSuccess(true);
    setTimeout(() => setSuccess(false), 2000);

    setTitle("");
    setAmount("");
    setType("income");
  };

  return (
    <div style={glassStyle}>

      {success && (
        <div
          style={{
            background: "#22c55e",
            color: "white",
            padding: "8px",
            borderRadius: "6px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          ✅ Transaction added successfully!
        </div>
      )}

      <h3 style={{ color: textPrimary }}>➕ Add Your Transaction</h3>
      <p style={{ color: textSecondary }}>Track your income & expenses easily</p>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>

        <div>
          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              ...inputStyle,
              border: titleError ? "1px solid red" : inputStyle.border,
            }}
          />
          {titleError && <p style={{ color: "red", fontSize: "12px" }}>{titleError}</p>}
        </div>

        <div>
          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) setAmount(e.target.value);
            }}
            style={{
              ...inputStyle,
              border: amountError ? "1px solid red" : inputStyle.border,
            }}
          />
          {amountError && <p style={{ color: "red", fontSize: "12px" }}>{amountError}</p>}
        </div>

        <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button type="submit" style={{ padding: "6px 12px", cursor: "pointer" }}>
          Add
        </button>

      </form>
    </div>
  );
}