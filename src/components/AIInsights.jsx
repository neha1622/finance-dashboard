export default function AIInsights({ transactions }) {
  if (!transactions.length) return <p>No data for AI insights</p>;

  const expenses = transactions.filter(t => t.type === "expense");

  const totalExpense = expenses.reduce((a, b) => a + b.amount, 0);

  const categoryMap = {};
  expenses.forEach(t => {
    categoryMap[t.title] = (categoryMap[t.title] || 0) + t.amount;
  });

  const highest = Object.keys(categoryMap).reduce((a, b) =>
    categoryMap[a] > categoryMap[b] ? a : b
  , "");

  return (
    <div style={{ padding: "10px" }}>
      <h3>🤖 AI Suggestions</h3>

      <p>💸 Total Expense: ₹{totalExpense}</p>

      <p>⚠️ Highest spending: <b>{highest}</b> (₹{categoryMap[highest]})</p>

      <p>
        👉 Suggestion: Try reducing spending on <b>{highest}</b> to improve savings.
      </p>

      <p>
        💡 Tip: Aim to save at least 20% of your income monthly.
      </p>
    </div>
  );
}