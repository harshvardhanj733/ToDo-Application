import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar(props) {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary mw-100">
  <div className="container-fluid">
    <div className="navbar-brand">
      ToDo App
    </div>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        {!props.isSignedIn? <>
        <li className="nav-item">
          <Link className="nav-link" to="/signup">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
        </>
        :
        <>
          <button onClick={()=>{
            localStorage.removeItem('token');
            navigate('/');
            props.setIsSignedIn(false);
          }}>
              LogOut
          </button>
        </>
        }
      </ul>
    </div>
  </div>
</nav>

    )
}
