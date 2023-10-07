import Layout from "./components/Layout";
import Login from "./components/Login";
import Register from "./components/Register";
import { QueryClientProvider, QueryClient } from "react-query";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";

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
          <Route element={<RequireAuth />}>
            <Route path="admin" element={<Admin />} />
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
