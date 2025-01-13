import { useState } from "react"; // Import useState
import { useQuery } from "@apollo/client";
import { useAuth } from "../context/authProvider";
import { HELLO_QUERY } from "../graphql/queries";
import HomeLayout from "../components/layout/HomeLayout";
import { Modal } from "../components/modals/Modal";

export default function Page() {
  const { token, logout } = useAuth();
  const { data, loading, error } = useQuery(HELLO_QUERY, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    },
  });

  // 🔥 Add modal state
  const [isOpen, setIsOpen] = useState(false);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <HomeLayout>
      <div className="text-white">
        <h1>Welcome to the Home Page</h1>
        <p>{data?.hello}</p>
        <button onClick={logout}>Logout</button>
      </div>

      {/* Open Modal Button */}
      <div>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>

        {/* Modal Component */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <h2>Modal Content</h2>
          <p>This content will be rendered in the portal.</p>
        </Modal>
      </div>
    </HomeLayout>
  );
}
