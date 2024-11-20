import "./App.css";
import ProtectedRoute from "./componets/ProtectedRoute";

function App() {
  return (
    <ProtectedRoute>
      <h1>Hello this is a protected route</h1>
    </ProtectedRoute>
  );
}

export default App;
