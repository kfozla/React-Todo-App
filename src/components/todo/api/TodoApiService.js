import axios from "axios";

const apiClient = axios.create({ baseURL: "http://localhost:8080/" });

export const retrieveTodos = (username) =>
  apiClient.get("/users/" + username + "/todos");

export const retrieveTodo = (username, id) =>
  apiClient.get("/users/" + username + "/todos/" + id);

export const deleteTodo = (username, id) =>
  apiClient.delete("/users/" + username + "/todos/" + id);

export const updateTodo = (username, id, todo) =>
  apiClient.put("/users/" + username + "/todos/" + id, todo);
export const addTodo = (username, todo) =>
  apiClient.post("/users/" + username + "/addTodo", todo);
