import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useParams,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./TodoApp.css";
import AuthProvider, { useAuth } from "./security/AuthContext";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return <Outlet />;
  } else return <Navigate to="/"></Navigate>;
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/logout" element={<LogOutComponent />} />
            <Route path="*" element={<ErrorComponent />} />

            {/* All protected routes are now under one AuthenticatedRoute */}
            <Route element={<AuthenticatedRoute />}>
              <Route path="/welcome/:username" element={<WelcomeComponent />} />
              <Route path="/todos" element={<ListTodo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticationValue, setAuthenticationValue] = useState(null);
  const authContext = useAuth();
  const navigate = useNavigate();

  function MessageComponent() {
    if (authenticationValue) {
      return (
        <div className="successfullAuthentication">
          Authentication Succesfull
        </div>
      );
    }
    if (authenticationValue == null) {
      return null;
    } else {
      return <div className="authenticationFailed">Authentication Failed</div>;
    }
  }

  function handleOnchangeName(e) {
    setUsername(e.target.value);
  }
  function handleOnchangePassword(e) {
    setPassword(e.target.value);
  }
  function authenticate() {
    if (username === "kfozla" && password === "123") {
      authContext.setAuthenticated(true);
      setAuthenticationValue(true);
      navigate("/welcome/" + username);
    } else {
      setAuthenticationValue(false);
      authContext.setAuthenticated(false);
    }
  }
  return (
    <div className="Login">
      <div className="LoginForm">
        <MessageComponent></MessageComponent>
        <div>
          <label>User Name:</label>
          <Input
            type="text"
            className="int"
            value={username}
            onChange={handleOnchangeName}
          ></Input>
        </div>
        <div>
          <label>Password:</label>
          <Input
            type="password"
            className="int"
            value={password}
            onChange={handleOnchangePassword}
          ></Input>
        </div>
        <div>
          <Button name="login" className="btn" onClick={authenticate}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

function WelcomeComponent() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="Welcome">
      {" "}
      <h1 style={{ margin: "20px", display: "inline-block" }}>
        Welcome {params.username}
      </h1>{" "}
      <Button
        onClick={() => navigate("/todos")}
        style={{ display: "block", margin: "0 auto" }}
      >
        Manage Your Todos
      </Button>
    </div>
  );
}
function ErrorComponent() {
  const navigate = useNavigate();
  return (
    <div className="ErrorComponent">
      <h1>Wrong Destination</h1>
      <Button onClick={() => navigate("/login")}>
        Click Here For Login Page
      </Button>
    </div>
  );
}
function ListTodo() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDate()
  );
  const todos = [
    { id: 1, description: "Learn Aws", done: false, targetDate: targetDate },
    {
      id: 2,
      description: "Learn Fullstack",
      done: true,
      targetDate: targetDate,
    },
    {
      id: 3,
      description: "Learn",
      done: false,
      targetDate: targetDate,
    },
    { id: 4, description: "Learn Azure", done: false, targetDate: targetDate },
  ];
  return (
    <div className="ListTodoComponent">
      <h1 style={{ marginBottom: "20px", display: "inline-block" }}>
        Your Todo List
      </h1>
      <table className="table">
        <thead>
          <tr>
            <td>Id</td>
            <td>Description</td>
            <td>Is done</td>
            <td>Target Date</td>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>{todo.done.toString()}</td>
              <td>{todo.targetDate.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HeaderComponent() {
  const navigate = useNavigate();
  const authContext = useAuth();
  function logout() {
    navigate("/logout");
    authContext.setAuthenticated(false);
  }
  console.log(authContext.isAuthenticated);
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
function LogOutComponent() {
  return (
    <div>
      <h1 style={{ margin: "20px", display: "inline-block" }}>
        Logged Out Succesfully
      </h1>
    </div>
  );
}
