import React from "react";
import {
  Home,
  Search,
  Plus,
  Heart,
  User,
  Shell,
  Settings,
  Menu,
} from "lucide-react";
import { useUserStore } from "../../app/stores/userStore";
import { Link } from "react-router-dom";

export const Sidebar: React.FC = () => {
  const { currentUser } = useUserStore();

  const sidebarItems = [
    { icon: <Home size={27} color="rgb(115, 115, 115)" />, path: "/" },
    { icon: <Search size={27} color="rgb(115, 115, 115)" />, path: "/search" },
    { icon: <Plus size={27} color="rgb(115, 115, 115)" />, path: "/create" },
    {
      icon: <Heart size={27} color="rgb(115, 115, 115)" />,
      path: "/favorites",
    },
    {
      icon: <User size={27} color="rgb(115, 115, 115)" />,
      path: currentUser ? `/u/${currentUser.username}` : "/auth/login",
    },
  ];

  return (
    <>
      {/* Mobile Sidebar */}
      <nav className="fixed bottom-0 w-full bg-normal-bg/90 backdrop-blur-md z-50 md:hidden py-3">
        <ul className="flex flex-row justify-around p-1">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-custom-gray duration-500 rounded-lg"
            >
              <Link to={item.path}>
                <div
                  className={`px-6 py-2 ${
                    index === 2 ? "bg-custom-gray rounded-lg" : ""
                  }`}
                >
                  {item.icon}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Sidebar */}
      <nav className="hidden md:flex justify-between items-center flex-col fixed left-0 h-full bg-normal-bg">
        <div className="p-4 mb-8">
          <Shell color="white" size={40} />
        </div>
        <ul className="flex flex-col p-2 gap-3">
          {sidebarItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer hover:bg-custom-gray duration-500 rounded-lg"
            >
              <Link to={item.path}>
                <div
                  className={`flex items-center text-[25px] px-4 py-2 ${
                    index === 2 ? "bg-custom-gray rounded-lg" : ""
                  }`}
                >
                  {item.icon}
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col gap-2">
          <Settings color="rgb(115, 115, 115)" size={25} />
          <Menu color="rgb(115, 115, 115)" size={25} />
        </div>
      </nav>
    </>
  );
};
