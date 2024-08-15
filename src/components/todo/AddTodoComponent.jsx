import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { addTodo, retrieveTodo, updateTodo } from "./api/TodoApiService";
import { useEffect, useState } from "react";
import { useAuth } from "./security/AuthContext";
import DatePicker from "react-datepicker";
import "./TodoApp.css";
import "react-datepicker/dist/react-datepicker.css";
export default function AddTodoComponent() {
  const authContext = useAuth();
  const { id } = useParams();
  const [description, setDescription] = useState(" ");
  const [isDone, setDone] = useState(false);
  const [selectedDate, setSelectedDate] = useState();
  const navigate = useNavigate();
  const todo = {
    id,
    username: authContext.username,
    description,
    targetDate: selectedDate,
    done: isDone,
  };

  const handleDoneChange = (event) => {
    const value = event.target.value === "true";
    setDone(value);
  };
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
  function editDesc(e) {
    setDescription(e.target.value);
  }

  useEffect(() => retrieveTodos(), [id]);
  function retrieveTodos() {
    retrieveTodo(authContext.username, id)
      .then((response) => {
        setDescription(response.data.description);
        setSelectedDate(response.data.targetDate);
        setDone(response.data.done);
      })
      .catch((error) => console.log(error));
  }

  function handleSubmit() {
    addTodo(authContext.username, todo)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    navigate("/todos");
  }
  return (
    <div>
      <h1>Enter Details</h1>
      <div className="updateDiv">
        <div>
          <label>Description:</label>
          <Input
            type="text"
            className="int"
            value={description}
            onChange={editDesc}
          ></Input>
        </div>
        <div>
          <label>Is it done:</label>
          <div>
            <select
              name="isDone"
              id="isDone"
              onChange={handleDoneChange}
              value={isDone}
            >
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
          </div>
        </div>
        <div>
          <label>Target Date:</label>
          <input
            type="date"
            id="tgDate"
            name="date"
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
        <Button className="updateBtn" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
