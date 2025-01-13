import React, { useState } from "react";
import { X } from "lucide-react";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [showInstagramBadge, setShowInstagramBadge] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-black w-full max-w-md rounded-xl text-white">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Profile</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Name Section */}
          <div className="mb-6">
            <h3 className="text-sm mb-2">Name</h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">
                KWIZERA Aimable (@aimable.kwiz)
              </span>
              <button className="bg-gray-800 rounded-full p-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <h3 className="text-sm mb-2">Bio</h3>
            <button className="text-gray-400 text-sm hover:text-white">
              + Write bio
            </button>
          </div>

          {/* Link Section */}
          <div className="mb-6">
            <h3 className="text-sm mb-2">Link</h3>
            <button className="text-gray-400 text-sm hover:text-white">
              + Add link
            </button>
          </div>

          {/* Instagram Badge Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm mb-1">Show Instagram badge</h3>
                <p className="text-gray-400 text-sm">
                  When turned off, the Threads badge on your Instagram profile
                  will also disappear.
                </p>
              </div>
              <button
                onClick={() => setShowInstagramBadge(!showInstagramBadge)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  showInstagramBadge ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    showInstagramBadge ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Private Profile Toggle */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm mb-1">Private profile</h3>
                <p className="text-gray-400 text-sm">
                  If you switch to private, you won't be able to reply to others
                  unless they follow you.
                </p>
              </div>
              <button
                onClick={() => setIsPrivate(!isPrivate)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                  isPrivate ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                    isPrivate ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Done Button */}
        <div className="border-t border-gray-800">
          <button
            onClick={onClose}
            className="w-full p-4 text-center font-semibold hover:bg-gray-900 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
