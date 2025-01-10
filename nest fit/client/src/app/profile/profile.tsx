import { useParams } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useEffect } from "react";
import HomeLayout from "../../components/layout/HomeLayout";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const {
    profileUser,
    currentUser,
    isLoading,
    fetchProfile,
    fetchCurrentUser,
  } = useUserStore();

  useEffect(() => {
    if (username) {
      if (currentUser && username === currentUser.username) {
        // If viewing own profile, use current user data
        return;
      }
      fetchProfile(username);
    } else {
      fetchCurrentUser();
    }
  }, [fetchProfile, fetchCurrentUser, username, currentUser]);

  if (isLoading) return <div>Loading...</div>;

  const user = username === currentUser?.username ? currentUser : profileUser;

  if (!user) return <div>User not found</div>;

  return (
    <HomeLayout>
      <div className="p-4">
        <div className="flex items-center gap-4">
          <img
            src={user.profilePicture || "/default-avatar.png"}
            alt={user.username}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
