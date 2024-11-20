import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/AuthContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginForm from "./componets/Loginform.tsx";
import CreateUserForm from "./componets/CreateUserForm.tsx";
import createClient from "./graphql/graphqlClient.ts";

const router = createBrowserRouter([
  { path: "/register", element: <CreateUserForm /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/", element: <App /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <ApolloProvider client={createClient(() => null)}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </AuthProvider>
  </StrictMode>
);
