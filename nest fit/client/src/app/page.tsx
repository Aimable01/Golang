import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../context/authProvider";

const HELLO_QUERY = gql`
  query Hello {
    hello
  }
`;

export default function Page() {
  const { token } = useAuth();
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
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>{data?.hello}</p>
    </div>
  );
}