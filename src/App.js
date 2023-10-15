import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import { QueryClientProvider, QueryClient } from "react-query";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import Missing from "./pages/Missing";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/" element={<Home />} />

          {/* protected routes */}
          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[]} />}>
            <Route path="employee" element={<Employee />} />
          </Route>

          {/* catch all  */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
