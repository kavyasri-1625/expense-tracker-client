export default function TransactionTable({ items = [], onDelete }) {
  return (
    <div className="card">
      <h3>Transactions</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Method</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((t) => (
            <tr key={t._id}>
              <td>{t.title}</td>
              <td>{t.type}</td>
              <td>{t.type === 'expense' ? (t.method || '-') : '-'}</td>
              <td>{t.amount}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onDelete?.(t._id)} className="danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
