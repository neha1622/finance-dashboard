import { useState } from "react";

export default function TransactionTable({
  transactions,
  setTransactions,
  role,
}) {
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white p-4 shadow rounded">
      <h2 className="font-bold mb-2">Transactions</h2>

      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-2 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id} className="text-center">
              <td>{t.date}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <p className="text-center mt-2">No transactions found</p>
      )}
    </div>
  );
}