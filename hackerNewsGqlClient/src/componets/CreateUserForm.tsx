import { useState } from "react";
import { CREATE_USER } from "../graphql/graphql";
import { useMutation } from "@apollo/client";

export default function CreateUserForm() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser({ variables: { input: { username, password } } });
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error creating user: ", error);
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
        <button type="submit">Create user</button>
      </form>
    </div>
  );
}
