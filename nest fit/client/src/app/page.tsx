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
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 w-full max-w-2xl mx-auto h-screen md:border border-none md:border-zinc-800 rounded-xl bg-black text-white overflow-y-auto scrollbar-hide">
        {/* Sticky Header */}
        <div className="sticky top-0 w-full bg-black/90 backdrop-blur-md z-50 flex justify-between items-center p-4 border-b border-zinc-800">
          <h1 className="text-[20px] font-semibold tracking-tight">Home</h1>
          <button className="text-zinc-500 hover:text-zinc-400 transition-colors duration-200">
            •••
          </button>
        </div>

        {/* Feed Content */}
        <div className="p-4 space-y-6">
          {/* Example Post Card */}
          <div className="rounded-xl border border-zinc-800 p-4 space-y-4 hover:border-zinc-700 transition-colors duration-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800"></div>
              <div>
                <h3 className="font-medium">John Doe</h3>
                <p className="text-[15px] text-zinc-400">@johndoe</p>
              </div>
            </div>
            <p className="text-[15px]">
              {data?.hello ||
                "Welcome to Nest Fit! Share your fitness journey."}
            </p>
            <div className="flex items-center gap-4 text-zinc-400">
              <button className="hover:text-white transition-colors duration-200">
                Like
              </button>
              <button className="hover:text-white transition-colors duration-200">
                Comment
              </button>
              <button className="hover:text-white transition-colors duration-200">
                Share
              </button>
            </div>
          </div>
        </div>

        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Create Post</h2>
            <textarea
              className="w-full h-32 bg-transparent border border-zinc-800 rounded-xl p-3 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-colors duration-200"
              placeholder="What's on your mind?"
            />
            <button className="w-full py-3 bg-white text-black rounded-xl font-medium hover:opacity-90 transition-opacity duration-200">
              Post
            </button>
          </div>
        </Modal>
      </div>
    </HomeLayout>
  );
}
