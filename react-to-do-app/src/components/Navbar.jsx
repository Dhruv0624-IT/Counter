import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">TaskManager</Link>
      {user && (
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/add">Add Task</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/view">View Tasks</Link></li>
          <li className="nav-item"><button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>Logout</button></li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
