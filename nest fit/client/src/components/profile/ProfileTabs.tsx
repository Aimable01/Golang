interface ProfileTabsProps {
  activeTab: "threads" | "replies" | "reposts";
  onTabChange: (tab: "threads" | "replies" | "reposts") => void;
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="border-t border-gray-800">
      <div className="flex">
        {[
          { key: "threads", label: "Threads" },
          { key: "replies", label: "Replies" },
          { key: "reposts", label: "Reposts" },
        ].map(({ key, label }) => (
          <button
            key={key}
            className={`flex-1 py-4 text-sm ${
              activeTab === key
                ? "text-white border-b-2 border-white"
                : "text-gray-500"
            }`}
            onClick={() =>
              onTabChange(key as "threads" | "replies" | "reposts")
            }
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};
