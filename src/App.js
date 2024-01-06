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
import Index from "./pages";
import UserProfile from "./components/UserProfile/UserProfile";
import UpdateProfile from "./components/UserProfile/UpdateProfile";
import { UserDetailsProvider } from "./context/UserDetailsProvider";
import Checkin from "./pages/Checkin";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserDetailsProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public routes */}
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="/" element={<Index />} />

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
                <Route path="/profile" element={<UserProfile />} />
                <Route
                  path="/updateprofile/:username"
                  element={<UpdateProfile />}
                />
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
                  <RequireAuth allowedRoles={["ROLE_EMPLOYEE", "ROLE_USER"]} />
                }
              >
                <Route path="checkin" element={<Checkin />} />
              </Route>
              <Route
                element={
                  <RequireAuth
                    allowedRoles={["ROLE_USER", "ROLE_USER", "ROLE_ADMIN"]}
                  />
                }
              ></Route>
            </Route>

            {/* catch all  */}
            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
      </UserDetailsProvider>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
