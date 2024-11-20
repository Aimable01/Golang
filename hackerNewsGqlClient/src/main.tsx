import { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import LoginForm from "./componets/Loginform.tsx";
import CreateUserForm from "./componets/CreateUserForm.tsx";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import createClient from "./graphql/graphqlClient";

const router = createBrowserRouter([
  { path: "/register", element: <CreateUserForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/", element: <App /> },
]);

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthContext);
  const client = createClient(authContext?.getToken || (() => null));
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ApolloWrapper>
        <RouterProvider router={router} />
      </ApolloWrapper>
    </AuthProvider>
  </StrictMode>
);
