import { useParams } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useEffect, useState } from "react";
import HomeLayout from "../../components/layout/HomeLayout";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileTabs } from "./components/ProfileTabs";
import { CreatePost } from "./components/CreatePost";
import { FinishProfile } from "./components/FinishProfile";

type TabType = "threads" | "replies" | "reposts";

export default function Profile() {
  const { username } = useParams<{ username: string }>();
  const {
    profileUser,
    currentUser,
    isLoading,
    fetchProfile,
    fetchCurrentUser,
  } = useUserStore();
  const [activeTab, setActiveTab] = useState<TabType>("threads");

  useEffect(() => {
    if (username) {
      if (currentUser && username === currentUser.username) {
        return;
      }
      fetchProfile(username);
    } else {
      fetchCurrentUser();
    }
  }, [fetchProfile, fetchCurrentUser, username, currentUser]);

  if (isLoading) return <div>Loading...</div>;

  const user = username === currentUser?.username ? currentUser : profileUser;
  const isOwnProfile = username === currentUser?.username;

  if (!user) return <div>User not found</div>;

  return (
    <HomeLayout>
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 w-full max-w-2xl mx-auto h-screen md:border border-none md:border-gray-400 rounded-xl bg-feed-bg text-white overflow-y-auto scrollbar-hide">
        {/* Sticky Header */}
        <div className="sticky top-0 w-full bg-normal-bg/90 backdrop-blur-md z-50 flex justify-between items-center p-4 border-b border-gray-400">
          <h1 className="text-xl font-bold">Profile</h1>
          <button className="text-gray-400">•••</button>
        </div>

        {/* Profile Content */}
        <ProfileHeader user={user} isOwnProfile={isOwnProfile} />
        <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <CreatePost user={user} />
        <FinishProfile />
      </div>
    </HomeLayout>
  );
}
