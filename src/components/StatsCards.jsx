export default function StatsCards({ items = [] }) {
  const income = items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0)
  const expense = items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0)
  const balance = income - expense
  return (
    <>
      <div className="grid">
        <div className="card stat"><div className="muted">Income</div><div className="big">₹ {income.toFixed(2)}</div></div>
        <div className="card stat"><div className="muted">Expense</div><div className="big">₹ {expense.toFixed(2)}</div></div>
        <div className={`card stat ${balance < 0 ? 'negative' : ''}`}><div className="muted">Balance</div><div className="big">₹ {balance.toFixed(2)}</div></div>
      </div>
      {balance < 0 && (
        <div className="card warning">Your balance is negative. Consider saving more and reducing expenses.</div>
      )}
    </>
  )
}
