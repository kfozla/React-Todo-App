import { useEffect, useState } from "react";
import "./TodoApp.css";
import {
  retrieveTodos,
  retrieveTodo,
  deleteTodo,
  updateTodo,
} from "./api/TodoApiService";
import { Button } from "../ui/button";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodo() {
  const [todos, setTodos] = useState([]);
  const authContext = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getTodos();
  }),
    [];

  function getTodos() {
    retrieveTodos(authContext.username)
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => ("some error occured,", error));
  }
  function getTodo() {
    retrieveTodo(authContext.username, 1)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => ("error occured", error));
  }
  function deleteTodoFunc(id) {
    deleteTodo(authContext.username, id)
      .then((response) => {
        console.log("deleted todo id: " + id);
      })
      .catch((error) => ("error occured", error));
  }
  function updateTodoFunc(id) {
    navigate("/todo/" + id);
  }
  function addTodoFunc() {
    navigate("/add-todo");
  }
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
            <td>Delete</td>
            <td>Update</td>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>{todo.done.toString()}</td>
              <td>{todo.targetDate}</td>
              <td>
                <Button onClick={() => deleteTodoFunc(todo.id)}>Delete</Button>
              </td>
              <td>
                <Button onClick={() => updateTodoFunc(todo.id)}>Update</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button className="addBtn" onClick={addTodoFunc}>
        Add New Todo
      </Button>
    </div>
  );
}
