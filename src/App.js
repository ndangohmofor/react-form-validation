import Layout from "./Layout";
import Login from "./Login";
import Register from "./Register";
import { QueryClientProvider, QueryClient } from "react-query";
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
          <Route path="admin" element={<Admin />} />
          <Route path="employee" element={<Employee />} />

          {/* catch all  */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
