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

  const handleSave = () => {
    // Handle saving the profile changes here
    console.log({ bio });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-white w-[30rem]">
        <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

        <div className="mb-4">
          <label className="block text-sm text-gray-400">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write bio"
            className="w-full p-2 bg-custom-gray text-white rounded-md border border-gray-600 focus:outline-none"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-2 mt-2 text-white bg-gray-700 hover:bg-gray-600 transition duration-300 rounded-md"
        >
          Done
        </button>
      </div>
    </Modal>
  );
};
