import "./TodoApp.css";

export default function ListTodo() {
  const today = new Date();
  const targetDate = new Date(
    today.getFullYear() + 12,
    today.getMonth(),
    today.getDate()
  );
  const todos = [
    { id: 1, description: "Learn Aws", done: false, targetDate: targetDate },
    {
      id: 2,
      description: "Learn Fullstack",
      done: true,
      targetDate: targetDate,
    },
    {
      id: 3,
      description: "Learn",
      done: false,
      targetDate: targetDate,
    },
    { id: 4, description: "Learn Azure", done: false, targetDate: targetDate },
  ];
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
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.description}</td>
              <td>{todo.done.toString()}</td>
              <td>{todo.targetDate.toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
