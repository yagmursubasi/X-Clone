import { FaRegComment, FaRetweet } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { RiShare2Line } from "react-icons/ri";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { PiHeartBold } from "react-icons/pi";
import User from "./user";
import Dropdown from "./dropdown";
import Content from "./content";
import Buttons from "./buttons";

const Post = ({ tweet }) => {
  return (
    <div className="border-b border-gray-700 last:border-b-0 p-4 flex gap-2">
      <img
        src={tweet.user.photo}
        alt="profile"
        className="size-8 rounded-full"
      />
      <div className="w-full">
        <div className="flex justify-between">
          <User tweet={tweet} />
          <Dropdown tweet={tweet} />
        </div>
        <Content data={tweet.content} />
        <Buttons tweet={tweet} />
      </div>
      {/* <div className="divide-y divide-gray-700">
        {[1, 2, 3].map((tweet) => (
          <div key={tweet} className="p-4 hover:bg-[#16181c] transition">
            <div className="flex justify-between">
              <div>
                <span className="font-bold text-[#e7e9ea]">yagmursubasi</span>
                <span className="text-gray-500">@yagmur · 2s</span>
              </div>
              <FiMoreHorizontal />
            </div>
            <p className="mt-2 text-[#e7e9ea]">
              Bu bir örnek tweet. Tasarımı istediğin gibi geliştirebilirsin!
            </p>
            <div className="flex justify-between mt-4 text-[#5d6165] max-w-md">
              <FaRegComment className="hover:text-blue-400 cursor-pointer text-[16px] rounded-full " />
              <FaRetweet className="hover:text-green-400 cursor-pointer text-[20px]  " />
              <PiHeartBold className="hover:text-pink-500 cursor-pointer text-[18px]" />
              <MdOutlineBookmarkBorder className="hover:text-blue-400 cursor-pointer text-[20px]" />
              <RiShare2Line className="hover:text-blue-400 cursor-pointer text-[18px]" />
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Post;
