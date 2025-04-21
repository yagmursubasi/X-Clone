import { signOut } from "firebase/auth";
import { navSections } from "../../utils/constants";
import { auth } from "../../firebase";
import { BiSolidDoorOpen } from "react-icons/bi";
import { RiQuillPenAiLine } from "react-icons/ri";

const Nav = ({ user }) => {
  return (
    <nav className="flex flex-col items-end justify-between  px-2 py-4 h-screen sticky top-0">
      <div>
        <img src="x-logo.webp" alt="x-logo" className="w-14 mb-4" />

        {navSections.map((item, key) => (
          <div
            key={key}
            className="flex items-center gap-1 mb-[11px] cursor-pointer hover:bg-gray-800 rounded-full p-2 transition-all duration-200 ease-in-out max-md:justify-center"
          >
            <span className="text-xl max-md:text-2xl">{item.icon}</span>
            <span className="text-nowrap max-md:hidden">{item.title}</span>
          </div>
        ))}
      </div>

      <div className="">
        <div className="w-12 h-12 flex items-center justify-center mb-10 rounded-full bg-[#e7e9ea] text-white cursor-pointer hover:bg-[#cbcfd1] transition-all duration-200 ease-in-out max-md:justify-center">
          <RiQuillPenAiLine className="text-2xl text-black" />
        </div>

        <div>
          <img
            src={user?.photoURL}
            referrerPolicy="no-referrer"
            alt="user-photo"
            className="w-10 h-10 rounded-full mb-2"
          />
          <p className="text-sm font-semibold max-md:hidden mb-2">
            {user?.displayName}
          </p>
        </div>
        <button
          onClick={() => signOut(auth)}
          className="bg-zinc-700  cursor-pointer flex justify-center items-center gap-2 rounded-full px-4 py-2 text-white font-semibold md:text-base transition-all duration-200 ease-in-out hover:bg-zinc-600 max-md:justify-center"
        >
          <BiSolidDoorOpen className="text-[20px] " />
          <span className="max-md:hidden">Çıkış Yap</span>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
