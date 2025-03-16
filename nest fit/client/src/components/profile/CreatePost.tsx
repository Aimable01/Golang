import { User } from "../../types/auth";
import avatar from "../../assets/placeholder.jpeg";

interface CreatePostProps {
  user: User;
}

export const CreatePost: React.FC<CreatePostProps> = ({ user }) => {
  return (
    <div className="p-4 flex gap-4 items-start border-b border-zinc-800/50">
      <div className="w-10 h-10 rounded-full overflow-hidden bg-zinc-800 border border-zinc-700/50">
        <img
          src={user.profilePicture || avatar}
          alt={user.username}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1">
        <input
          type="text"
          placeholder="Start a thread..."
          className="w-full bg-transparent text-[15px] text-white placeholder:text-zinc-500 resize-none focus:outline-none"
        />
        <div className="flex justify-end mt-3">
          <button className="px-5 py-2 bg-white/10 hover:bg-white/20 text-[13px] font-medium text-white rounded-lg transition-colors duration-200">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};
