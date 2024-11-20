import React, { useContext, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LOGIN_MUTATION = gql`
  mutation Login($input: Login!) {
    login(input: $input)
  }
`;

export default function LoginForm() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (authContext?.isAuthenticated) {
      navigate("/"); // Redirect to app if already logged in
    }
  }, [authContext?.isAuthenticated, navigate]);

  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    try {
      const response = await login({
        variables: {
          input: {
            username,
            password,
          },
        },
      });
      const token = response.data?.login;
      if (token && authContext) {
        authContext.login(token);
        navigate("/"); // Redirect to app after login
      }
    } catch (err) {
      console.error("Error logging in:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" type="text" placeholder="Username" required />
      <input name="password" type="password" placeholder="Password" required />
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}
