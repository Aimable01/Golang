import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext?.isAuthenticated) {
      navigate("/login");
    }
  }, [authContext?.isAuthenticated, navigate]);

  return <h1>Welcome to the App!</h1>;
}

export default App;
