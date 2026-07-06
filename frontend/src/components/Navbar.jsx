import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-container">

        <Link to="/" className="logo">
          🌌 ExoDetect AI
        </Link>

        <nav>
          <ul className="nav-links">

            <li>
              <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className={location.pathname === "/dashboard" ? "active" : ""}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <a href="#analytics">Analytics</a>
            </li>

            <li>
              <a href="#prediction">Prediction</a>
            </li>

            <li>
              <a href="#about">About</a>
            </li>

          </ul>
        </nav>

      </div>
    </header>
  );
}

export default Navbar;