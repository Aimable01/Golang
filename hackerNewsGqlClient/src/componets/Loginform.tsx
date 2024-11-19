import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LOGIN } from "../graphql/graphql";

export default function LoginForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login] = useMutation(LOGIN);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: { input: { username, password } },
      });
      const token = data.login;
      localStorage.setItem("token", token);
      console.log("Login successful: ", data);
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
