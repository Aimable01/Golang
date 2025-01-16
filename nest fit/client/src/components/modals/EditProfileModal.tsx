import { useState } from "react";
import { Modal } from "../modals/Modal";

export const EditProfileModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [bio, setBio] = useState("");
  const [link, setLink] = useState("");
  const [showInstagramBadge, setShowInstagramBadge] = useState(true);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSave = () => {
    // Handle saving the profile changes here
    console.log({ bio, link, showInstagramBadge, isPrivate });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-white w-80">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write bio"
            className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-400">Link</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Add link"
            className="w-full p-2 bg-gray-800 text-white rounded-md border border-gray-600"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <span>Show Instagram badge</span>
          <input
            type="checkbox"
            checked={showInstagramBadge}
            onChange={() => setShowInstagramBadge(!showInstagramBadge)}
            className="toggle-checkbox"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <span>Private profile</span>
          <input
            type="checkbox"
            checked={isPrivate}
            onChange={() => setIsPrivate(!isPrivate)}
            className="toggle-checkbox"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 mt-2 bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};
