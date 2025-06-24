import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/authSlice'

function Navbar() {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link to="/">
            <span className="navbar-logo">🐝 THE TASKER</span>
          </Link>
        </div>
        <div className="navbar-links">
          {user ? (
            <button className="navbar-link" onClick={() => dispatch(logout())}>Logout</button>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar