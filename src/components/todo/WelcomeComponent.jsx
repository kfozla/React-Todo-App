import { Button } from "../ui/button";

import { useNavigate, useParams } from "react-router-dom";
import "./TodoApp.css";

export default function WelcomeComponent() {
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
