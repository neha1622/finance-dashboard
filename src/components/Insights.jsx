export default function Insights({ transactions }) {
  const expenses = transactions.filter(t => t.type === "expense");
  const highestCategory = expenses.reduce((acc, t) => {
    acc[t.title] = (acc[t.title] || 0) + t.amount;
    return acc;
  }, {});
  const maxCategory = Object.keys(highestCategory).reduce((a, b) => highestCategory[a] > highestCategory[b] ? a : b, "");

  return (
    <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <h3>Insights</h3>
      <p>Highest spending category: {maxCategory} ₹{highestCategory[maxCategory]}</p>
      <p>Total transactions this month: {transactions.filter(t => new Date(t.date).getMonth() === new Date().getMonth()).length}</p>
    </div>
  );
}