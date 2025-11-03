import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

export default function ChartBox({ items = [] }) {
  const [groupBy, setGroupBy] = useState('type') // 'type' | 'title' | 'method'

  const data = useMemo(() => {
    if (groupBy === 'type') {
      const income = items.filter(i => i.type === 'income').reduce((s, i) => s + i.amount, 0)
      const expense = items.filter(i => i.type === 'expense').reduce((s, i) => s + i.amount, 0)
      return [
        { name: 'Income', value: income, key: 'income' },
        { name: 'Expense', value: expense, key: 'expense' },
      ]
    }

    const filtered = items.filter(i => i.type === 'expense')
    const grouped = filtered.reduce((acc, cur) => {
      const key = groupBy === 'method' ? (cur.method || 'unknown') : cur.title
      acc[key] = (acc[key] || 0) + cur.amount
      return acc
    }, {})
    return Object.entries(grouped).map(([name, value]) => ({ name, value }))
  }, [items, groupBy])

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#845EC2', '#4D8076', '#D65DB1']
  const typeColors = { income: '#10B981', expense: '#EF4444' }

  return (
    <div className="card">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <h3>Spending breakdown</h3>
        <select value={groupBy} onChange={(e)=>setGroupBy(e.target.value)} style={{ maxWidth: 180 }}>
          <option value="type">By Type</option>
          <option value="title">By Title</option>
          <option value="method">By Method</option>
        </select>
      </div>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} outerRadius={100} fill="#8884d8" label>
              {data.map((entry, index) => {
                const color = groupBy === 'type' && entry.key ? typeColors[entry.key] : colors[index % colors.length]
                return <Cell key={`cell-${index}`} fill={color} />
              })}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
