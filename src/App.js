import Login from "./Login";
import Register from "./Register";
import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="App">
        {/* <Register /> */}
        <Login />
      </main>
    </QueryClientProvider>
  );
}

export default App;
