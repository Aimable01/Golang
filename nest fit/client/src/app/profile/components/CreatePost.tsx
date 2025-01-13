import { User } from "../../../types/auth";

interface CreatePostProps {
  user: User;
}

export const CreatePost: React.FC<CreatePostProps> = ({ user }) => {
  return (
    <div className="p-4 flex gap-4 items-start border-b border-gray-800">
      <img
        src={user.profilePicture || "/default-avatar.png"}
        alt={user.username}
        className="w-10 h-10 rounded-full bg-gray-700"
      />
      <div className="flex-1">
        <input
          type="text"
          placeholder="What's new?"
          className="w-full bg-transparent text-white resize-none focus:outline-none"
        />
        <div className="flex justify-end mt-2">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
