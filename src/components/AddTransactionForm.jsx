import { useState } from 'react'
import api from '../api/axios'

export default function AddTransactionForm({ onAdded }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')
  const [method, setMethod] = useState('cash')
  const [date, setDate] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/api/expenses/add', { title, amount: Number(amount), type, date, method: type === 'expense' ? method : undefined })
      setTitle(''); setAmount(''); setType('expense'); setMethod('cash'); setDate('')
      onAdded?.()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add')
    }
  }

  return (
    <form className="card" onSubmit={submit}>
      <h3>Add Transaction</h3>
      <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <input placeholder="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      {type === 'expense' && (
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="cash">Cash</option>
          <option value="upi">UPI</option>
        </select>
      )}
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      {error && <div className="error">{error}</div>}
      <button type="submit">Add</button>
    </form>
  )
}
