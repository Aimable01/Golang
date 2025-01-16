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
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="">@{user.username}</p>
          </div>
          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
            {!user.profilePicture && (
              <img
                src={avatar}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            )}
            {user.profilePicture && (
              <img
                src={user.profilePicture}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            <div className="w-6 h-6 bg-gray-700 rounded-full border-2 border-black"></div>
            <div className="w-6 h-6 bg-gray-800 rounded-full border-2 border-black"></div>
          </div>
          <span className="text-sm text-gray-400">9 followers</span>
        </div>

        {isOwnProfile && (
          <>
            <button
              className="w-full py-2 px-4 bg-transparent border border-gray-700 rounded-lg text-white hover:bg-gray-800"
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
