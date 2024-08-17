import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./TodoApp.css";
import AuthProvider, { useAuth } from "./security/AuthContext";
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import ListTodo from "./ListtodoComponent";
import HeaderComponent from "./HeaderComponent";
import LogOutComponent from "./LogoutComponent";
import UpdateTodoComponent from "./UpdateTodocomponent";
import AddTodoComponent from "./AddTodoComponent";

function AuthenticatedRoute({ children }) {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return children;
  } else return <Navigate to="/"></Navigate>;
}

export default function TodoApp() {
  return (
    <div className="TodoApp">
      <AuthProvider>
        <BrowserRouter>
          <HeaderComponent />
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/logout" element={<LogOutComponent />} />
            <Route path="*" element={<ErrorComponent />} />

            {/* All protected routes are now under one AuthenticatedRoute */}
            <Route
              path="/welcome/:username"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodo />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/todo/:id"
              element={
                <AuthenticatedRoute>
                  <UpdateTodoComponent />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/add-todo"
              element={
                <AuthenticatedRoute>
                  <AddTodoComponent />
                </AuthenticatedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
