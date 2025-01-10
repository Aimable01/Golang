import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Page from "./app/page";
import Signup from "./app/auth/signup";
import Login from "./app/auth/login";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apolloClient";
import { AuthProvider } from "./context/authProvider";
import { ToastContainer } from "react-toastify";
import Profile from "./app/profile/profile";

const router = createBrowserRouter([
  { path: "/", element: <Page /> },
  { path: "/auth/signup", element: <Signup /> },
  { path: "/auth/login", element: <Login /> },
  { path: "/@:username", element: <Profile /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);
