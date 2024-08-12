import { useEffect, useState } from "react";
import "./TodoApp.css";
import { retrieveTodos, retrieveTodo, deleteTodo } from "./api/TodoApiService";
import { Button } from "../ui/button";

export default function ListTodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }),
    [];

  function getTodos() {
    retrieveTodos("kfozla")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => ("some error occured,", error));
  }
  function getTodo() {
    retrieveTodo("kfozla", 1)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => ("error occured", error));
  }
  function deleteTodoFunc(id) {
    deleteTodo("kfozla", id)
      .then((response) => {
        console.log("deleted todo id: " + id);
      })
      .catch((error) => ("error occured", error));
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
            <td></td>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
