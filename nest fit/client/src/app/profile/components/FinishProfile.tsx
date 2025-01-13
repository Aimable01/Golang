import { Camera, Pencil, Check } from "lucide-react";

export const FinishProfile = () => {
  const items = [
    {
      icon: <Camera size={24} />,
      title: "Add profile photo",
      description: "Make it easier for people to recognize you",
    },
    {
      icon: <Pencil size={24} />,
      title: "Add bio",
      description: "Introduce yourself and tell people what you're into",
    },
    {
      icon: <Check size={24} />,
      title: "Create thread",
      description: "Say what's on your mind or share a recent highlight",
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium">Finish your profile</h3>
        <span className="text-sm text-gray-500">2 left</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-gray-800 rounded-lg flex flex-col items-center text-center gap-2 cursor-pointer hover:bg-gray-700"
          >
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mb-2 text-gray-400">
              {item.icon}
            </div>
            <h4 className="font-medium">{item.title}</h4>
            <p className="text-sm text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
