/* eslint-disable */
import { useState } from "react";

import { HiX } from "react-icons/hi";
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";

import Links from "./components/Links";

// import SidebarCard from "components/sidebar/componentsrtl/SidebarCard";
import routes from "routes.js";

const Sidebar = ({ open, onClose }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`relative ${collapsed ? "w-[80px]" : "w-[300px]"} sm:none duration-175 linear sticky top-0 flex max-h-screen flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white ${open ? "translate-x-0" : "-translate-x-96"
        }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>

      <div className={`mx-auto my-[30px] flex items-center`}>
        {collapsed ? (
          <div className="mt-1 ml-1 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            HP
          </div>
        ) : (
          <div className="mt-1 ml-1 font-poppins text-[26px] font-bold uppercase text-navy-700 dark:text-white">
            Hunting <span class="font-medium">Portal</span>
          </div>
        )}
      </div>
      <div class="mb-7 h-px bg-gray-300 dark:bg-white/30" />
      {/* Nav item */}

      <ul className="mb-auto pt-1">
        <Links routes={routes} isCollapsed={collapsed}/>
      </ul>

      {/* Nav item end */}

      <button
        className="absolute top-[50%] bg-[#422afb] translate-y-[-50%] translate-x-[45%] right-0 text-[25px] text-white p-2 rounded-full"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? (
          <IoIosArrowForward className="text-center"/>
        ) : (
          <IoIosArrowBack className="text-center"/>
        )}
      </button>
    </div>
  );
};

export default Sidebar;
