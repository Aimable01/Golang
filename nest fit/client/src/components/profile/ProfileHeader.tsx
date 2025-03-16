import { User } from "../../types/auth";
import avatar from "../../assets/placeholder.jpeg";
import { useState } from "react";
import { EditProfileModal } from "../modals/EditProfileModal";

interface ProfileHeaderProps {
  user: User;
  isOwnProfile: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  isOwnProfile,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-4 text-white">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-[20px] font-semibold tracking-tight">
              {user.name}
            </h2>
            <p className="text-[15px] text-zinc-400">@{user.username}</p>
          </div>
          <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center overflow-hidden border border-zinc-700">
            <img
              src={user.profilePicture || avatar}
              alt={user.username}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-7 h-7 bg-zinc-800 rounded-full border-2 border-black"></div>
            <div className="w-7 h-7 bg-zinc-700 rounded-full border-2 border-black"></div>
          </div>
          <span className="text-[15px] text-zinc-400">9 followers</span>
        </div>

        {isOwnProfile && (
          <>
            <button
              className="w-full py-4 bg-transparent border border-zinc-800 rounded-xl text-[15px] font-medium text-white hover:border-zinc-700 transition-colors duration-200"
              onClick={() => setIsModalOpen(true)}
            >
              Edit profile
            </button>
            <EditProfileModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </>
        )}
      </div>
    </div>
  );
};
