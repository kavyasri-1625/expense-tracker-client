import { useEffect, useState } from 'react'
import api from '../api/axios'
import AddTransactionForm from '../components/AddTransactionForm'
import TransactionTable from '../components/TransactionTable'
import StatsCards from '../components/StatsCards'
import ChartBox from '../components/ChartBox'

export default function Dashboard() {
  const [items, setItems] = useState([])
  const [date, setDate] = useState('')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [method, setMethod] = useState('all')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const load = async () => {
    if (!user?._id) return
    const params = new URLSearchParams()
    if (date) params.append('date', date)
    if (!date && from) params.append('from', from)
    if (!date && to) params.append('to', to)
    if (method !== 'all') params.append('method', method)
    const qs = params.toString()
    const url = `/api/expenses/all/${user._id}${qs ? `?${qs}` : ''}`
    const { data } = await api.get(url)
    setItems(data)
  }

  const del = async (id) => {
    await api.delete(`/api/expenses/${id}`)
    load()
  }

  useEffect(() => { load() }, [])
  useEffect(() => { load() }, [date, from, to, method])

  return (
    <div className="container">
      <h2>Welcome, {user?.name || 'User'}</h2>
      <div className="card">
        <h3>Filter by date</h3>
        <div className="grid-3">
          <div>
            <label className="label">Single date</label>
            <input type="date" value={date} onChange={(e) => { setDate(e.target.value); if (e.target.value) { setFrom(''); setTo('') } }} />
          </div>
          <div>
            <label className="label">From</label>
            <input type="date" value={from} onChange={(e) => { setFrom(e.target.value); if (e.target.value) setDate('') }} />
          </div>
          <div>
            <label className="label">To</label>
            <input type="date" value={to} onChange={(e) => { setTo(e.target.value); if (e.target.value) setDate('') }} />
          </div>
        </div>
        <div style={{ marginTop: 8 }}>
          <label className="label">Payment method</label>
          <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ maxWidth: 220 }}>
            <option value="all">All</option>
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
          </select>
        </div>
      </div>
      <StatsCards items={items} />
      <div className="grid-2">
        <AddTransactionForm onAdded={load} />
        <ChartBox items={items} />
      </div>
      <TransactionTable items={items} onDelete={del} />
    </div>
  )
}
