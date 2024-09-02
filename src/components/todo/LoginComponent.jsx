import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import "./TodoApp.css";
import { useAuth } from "./security/AuthContext";

export default function LoginComponent() {
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext.isAuthenticated) {
      navigate("/welcome/" + authContext.username);
    }
  }, [authContext.isAuthenticated, navigate, authContext.username]);
  function MessageComponent() {
    if (authContext.authenticationValue) {
      return (
        <div className="successfullAuthentication">
          Authentication Succesfull
        </div>
      );
    }
    if (authContext.authenticationValue == null) {
      return null;
    } else {
      return <div className="authenticationFailed">Authentication Failed</div>;
    }
  }
  function handleOnchangeName(e) {
    authContext.setUsername(e.target.value);
  }
  function handleOnchangePassword(e) {
    authContext.setPassword(e.target.value);
  }
  authContext.authenticate;
  return (
    <div className="Login">
      <div className="LoginForm">
        <MessageComponent></MessageComponent>
        <div>
          <label>User Name:</label>
          <Input
            type="text"
            className="int"
            value={authContext.username}
            onChange={handleOnchangeName}
          ></Input>
        </div>
        <div>
          <label>Password:</label>
          <Input
            type="password"
            className="int"
            value={authContext.password}
            onChange={handleOnchangePassword}
          ></Input>
        </div>
        <div>
          <Button
            name="login"
            className="btn"
            onClick={authContext.authenticate}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
