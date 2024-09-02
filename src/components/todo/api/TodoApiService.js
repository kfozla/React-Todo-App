import axios from "axios";

import { apiClient } from "./ApiClient";

export const retrieveTodos = (username) =>
  apiClient.get("/users/" + username + "/todos", {
    headers: {
      Authorization: "Basic a2ZvemxhOjEyMw==",
    },
  });

export const retrieveTodo = (username, id) =>
  apiClient.get("/users/" + username + "/todos/" + id);

export const deleteTodo = (username, id) =>
  apiClient.delete("/users/" + username + "/todos/" + id);

export const updateTodo = (username, id, todo) =>
  apiClient.put("/users/" + username + "/todos/" + id, todo);
export const addTodo = (username, todo) =>
  apiClient.post("/users/" + username + "/addTodo", todo);
export const executeBasicAuthenticationService = (token) =>
  apiClient.get("/basicauth", {
    headers: {
      Authorization: token,
    },
  });
