import { useState } from "react";
import "./App.css";
import TodoApp from "./components/todo/todoApp";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <TodoApp></TodoApp>
    </div>
  );
}

export default App;
