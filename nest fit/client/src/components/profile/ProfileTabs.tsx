interface ProfileTabsProps {
  activeTab: "threads" | "replies" | "reposts";
  onTabChange: (tab: "threads" | "replies" | "reposts") => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="border-t border-zinc-800/50">
      <div className="flex">
        {[
          { key: "threads", label: "Threads" },
          { key: "replies", label: "Replies" },
          { key: "reposts", label: "Reposts" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`flex-1 py-3 text-[15px] font-medium relative ${
              activeTab === key
                ? "text-white"
                : "text-zinc-500 hover:text-zinc-400"
            } transition-colors duration-200`}
            onClick={() =>
              onTabChange(key as "threads" | "replies" | "reposts")
            }
          >
            {label}
            {activeTab === key && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
