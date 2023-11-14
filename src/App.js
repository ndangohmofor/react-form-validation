import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import PersistLogin from "./components/PersistLogin/PersistLogin";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import Missing from "./pages/Missing";
import Home from "./pages/Home";
import UserProfileCard from "./components/UserProfile/UserProfileCard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* protected routes */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]} />}>
              <Route path="/admin" element={<Admin />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={["ROLE_USER", "ROLE_EMPLOYEE", "ROLE_ADMIN"]}
                />
              }
            >
              <Route path="/profile" element={<UserProfileCard />} />
            </Route>
            <Route
              element={
                <RequireAuth allowedRoles={["ROLE_EMPLOYEE", "ROLE_ADMIN"]} />
              }
            >
              <Route path="/employee" element={<Employee />} />
            </Route>
            <Route
              element={
                <RequireAuth
                  allowedRoles={["ROLE_USER", "ROLE_USER", "ROLE_ADMIN"]}
                />
              }
            >
              <Route path="/home" element={<Home />} />
            </Route>
          </Route>

          {/* catch all  */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
