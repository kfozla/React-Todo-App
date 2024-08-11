import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import "./TodoApp.css";
import { useAuth } from "./security/AuthContext";

export default function LoginComponent() {
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
