import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../firebase";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [users, setUser] = useState({});
  const redirect = useNavigate()
  function signup() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        redirect("/taskForm")
        // console.log(result.user.displayName)
        // console.log(result.user.email)
        // console.log(result.user.photoURL)
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      localStorage.setItem("uId", user?.uid);
      // console.log(user?.uid);
      setUser(user);
    });
  }, []);
  function logout() {
    signOut(auth)
      .then(() => {
        alert("You are logout");
        localStorage.removeItem('uId')
        redirect("/signin")
      })
      .catch((e) => console.log(e));
  }
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              Navbar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                {users == null ? (
                  <>
                    <li>
                      <NavLink to="/signup" className="btn btn-outline-primary">
                        Sign Up
                      </NavLink>
                    </li>
                    <li>
                      <button
                        to="/signin"
                        onClick={signup}
                        className="btn btn-outline-primary"
                      >
                        Sign In with Google
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link active"
                        aria-current="page"
                        to="/taskForm"
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/taskList">
                        View Task
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/taskItem">
                        Single Task
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Dropdown
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdown"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            <img src={users.photoURL} alt="" />
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            {users.displayName}
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            {users.email}
                          </a>
                        </li>
                      </ul>
                      <li>
                        <button
                          onClick={logout}
                          className="btn btn-outline-primary"
                        >
                          Log Out
                        </button>
                      </li>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
