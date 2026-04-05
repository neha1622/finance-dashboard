import { useState } from "react";

export default function GoalTracker({ transactions }) {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState("");
  const [target, setTarget] = useState("");

  // ✅ NEW: error states
  const [nameError, setNameError] = useState("");
  const [amountError, setAmountError] = useState("");

  // 💰 Calculate savings
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const savings = income - expense;

  // ➕ Add goal
  const addGoal = () => {
    let valid = true;

    // reset errors
    setNameError("");
    setAmountError("");

    // ✅ validation
    if (!goalName.trim()) {
      setNameError("Goal name is required");
      valid = false;
    }

    if (!target) {
      setAmountError("Target amount is required");
      valid = false;
    } else if (isNaN(target)) {
      setAmountError("Only numbers are allowed");
      valid = false;
    } else if (Number(target) <= 0) {
      setAmountError("Amount must be greater than 0");
      valid = false;
    }

    if (!valid) return;

    const newGoal = {
      id: Date.now(),
      name: goalName,
      target: Number(target),
    };

    setGoals([...goals, newGoal]);

    // reset
    setGoalName("");
    setTarget("");
  };

  // ❌ Delete goal
  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  return (
    <div>
      <h3>🎯 Goal Tracker</h3>

      {/* ADD GOAL */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        
        {/* NAME INPUT */}
        <div>
          <input
            placeholder="Goal (Car, Bike...)"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            style={{
              border: nameError ? "1px solid red" : "1px solid #ccc",
              padding: "5px",
              borderRadius: "5px",
            }}
          />
          {nameError && (
            <p style={{ color: "red", fontSize: "12px", margin: 0 }}>
              {nameError}
            </p>
          )}
        </div>

        {/* AMOUNT INPUT */}
        <div>
          <input
            type="text"
            placeholder="Target Amount"
            value={target}
            onChange={(e) => {
              const value = e.target.value;

              // ✅ allow only numbers
              if (/^\d*$/.test(value)) {
                setTarget(value);
              }
            }}
            style={{
              border: amountError ? "1px solid red" : "1px solid #ccc",
              padding: "5px",
              borderRadius: "5px",
            }}
          />
          {amountError && (
            <p style={{ color: "red", fontSize: "12px", margin: 0 }}>
              {amountError}
            </p>
          )}
        </div>

        <button onClick={addGoal}>Add Goal</button>
      </div>

      {/* GOAL LIST */}
      {goals.length === 0 && <p>No goals added</p>}

      {goals.map((g) => {
        const progress = Math.min((savings / g.target) * 100, 100);
        const remaining = g.target - savings;

        return (
          <div
            key={g.id}
            style={{
              marginTop: "15px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <h4>{g.name}</h4>

            <p>💰 Saved: ₹{savings}</p>
            <p>🎯 Target: ₹{g.target}</p>
            <p>⏳ Remaining: ₹{remaining > 0 ? remaining : 0}</p>

            {/* PROGRESS BAR */}
            <div
              style={{
                height: "10px",
                background: "#ddd",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  background: "green",
                  height: "100%",
                  borderRadius: "5px",
                  transition: "0.3s",
                }}
              />
            </div>

            {/* DELETE BUTTON */}
            <button
              onClick={() => deleteGoal(g.id)}
              style={{
                marginTop: "10px",
                background: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}