import React, { useContext } from "react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LOGIN_MUTATION = gql`
  mutation Login($input: Login!) {
    login(input: $input)
  }
`;

export default function LoginForm() {
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

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
        navigate("/");
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
