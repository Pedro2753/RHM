import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../assets/img/rh_logo.png";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  function handleLogout() {
    localStorage.removeItem("user");
    navigate("/login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid px-4">
        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logo}
            alt="Logo"
            className="rounded me-2"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <span className="fw">RH MANAGER ⁽ᵃˡᶠᵃ⁾
</span>
        </Link>

        {/* BOTÃO MOBILE */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Alternar navegação"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-2">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/funcionarios">
                Funcionários
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/enterprises">
                Empresas
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Usuários
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Sobre
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-outline-light btn-sm ms-3 mt-1"
              >
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
