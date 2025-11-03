import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'
import Logout from './pages/Logout'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  const navigate = useNavigate()

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null') } catch { return null }
  })()

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div>
      <nav className="nav" style={{ justifyContent:'space-between' }}>
        <div className="brand">BUDGET TRACKER</div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/contact">Contact</Link>
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <div className="user-menu">
              <span className="user-name">{user.name}</span>
              <button className="btn-outline" onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div style={{ padding: 24 }}>404</div>} />
      </Routes>
    </div>
  )
}
