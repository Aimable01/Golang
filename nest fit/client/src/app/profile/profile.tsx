import { useParams } from "react-router-dom";
import { useUserStore } from "../stores/userStore";
import { useEffect, useState } from "react";
import HomeLayout from "../../components/layout/HomeLayout";
import { ProfileHeader } from "../../components/profile/ProfileHeader";
import { ProfileTabs } from "../../components/profile/ProfileTabs";
import { CreatePost } from "../../components/profile/CreatePost";
import { FinishProfile } from "../../components/profile/FinishProfile";

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
      <div className="fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 w-full max-w-2xl mx-auto h-screen md:border border-none md:border-zinc-800 rounded-xl bg-black text-white overflow-y-auto scrollbar-hide">
        {/* Sticky Header */}
        <div className="sticky top-0 w-full bg-black/90 backdrop-blur-md z-50 flex justify-between items-center p-4 border-b border-zinc-800">
          <h1 className="text-[20px] font-semibold tracking-tight">Profile</h1>
          <button className="text-zinc-500 hover:text-zinc-400 transition-colors duration-200">
            •••
          </button>
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
