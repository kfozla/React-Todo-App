import { Button } from "../ui/button";

import { useNavigate, Link } from "react-router-dom";
import "./TodoApp.css";
import { useAuth } from "./security/AuthContext";

export default function HeaderComponent() {
  const navigate = useNavigate();
  const authContext = useAuth();
  function logout() {
    navigate("/logout");
    authContext.setAuthenticated(false);
  }
  return (
    <div className="header">
      <nav>
        <div>
          <h1>Todo App</h1>
          <Link className="lnk" to="/login">
            Home
          </Link>
          <Link to="/todos">Todos</Link>
          {authContext.isAuthenticated && (
            <Button className="navbtn" onClick={logout}>
              Log Out
            </Button>
          )}
          {!authContext.isAuthenticated && (
            <Button className="navbtn" onClick={() => navigate("/login")}>
              Log In
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
}
