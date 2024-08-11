import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import "./TodoApp.css";
import AuthProvider, { useAuth } from "./security/AuthContext";
import LoginComponent from "./LoginComponent";
import WelcomeComponent from "./WelcomeComponent";
import ErrorComponent from "./ErrorComponent";
import ListTodo from "./ListtodoComponent";
import HeaderComponent from "./HeaderComponent";
import LogOutComponent from "./LogoutComponent";

function AuthenticatedRoute() {
  const authContext = useAuth();
  if (authContext.isAuthenticated) {
    return <Outlet />;
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
            <Route element={<AuthenticatedRoute />}>
              <Route path="/welcome/:username" element={<WelcomeComponent />} />
              <Route path="/todos" element={<ListTodo />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}
