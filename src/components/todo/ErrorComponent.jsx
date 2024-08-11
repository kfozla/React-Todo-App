import { Button } from "../ui/button";

import { useNavigate } from "react-router-dom";
import "./TodoApp.css";

export default function ErrorComponent() {
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
