import { useQuery } from "@apollo/client";
import { useAuth } from "../context/authProvider";
import { HELLO_QUERY } from "../graphql/queries";

export default function Page() {
  const { token, logout } = useAuth();
  const { data, loading, error } = useQuery(HELLO_QUERY, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="text-white">
      <h1>Welcome to the Home Page</h1>
      <p>{data?.hello}</p>
      <button onClick={logout}>logout</button>
    </div>
  );
}
