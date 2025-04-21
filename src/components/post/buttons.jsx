import { FaHeart, FaRegComment, FaRetweet } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { RiShare2Line } from "react-icons/ri";
import { MdOutlineBookmarkBorder } from "react-icons/md";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../../firebase/index";
const Buttons = ({ tweet }) => {
  //oturumu açık olan kullanıcı bu tweeti likelayanlar arasında mı ?
  const isLiked = tweet.likes.includes(auth.currentUser.uid);
  //like butonuna tıklanınca
  const toggleLike = () => {
    //güncellnecek dökümanın referansı
    const tweetRef = doc(db, "tweets", tweet.id);
    //kullanıcı id`si likes dizisine ekle eğer kullanıcı likelamadıysa kullanıcı idsini likes dizisinden kaldır
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  return (
    <div className="flex justify-between mt-4 items-center text-[#5d6165] max-w-md">
      <button className=" hover:bg-blue-600/10 p-2 rounded-full transition cursor-pointer">
        <FaRegComment className="hover:text-blue-400 cursor-pointer text-[16px] " />
      </button>
      <button className="hover:bg-green-600/10 p-2 rounded-full transition cursor-pointer">
        <FaRetweet className="hover:text-green-400  text-[20px]  " />
      </button>
      <button
        onClick={toggleLike}
        className="flex items-center gap-1 group relative"
      >
        <div className="p-2 rounded-full transition group-hover:bg-pink-600/10">
          {isLiked ? (
            <PiHeartFill className="text-pink-500 text-[18px]" />
          ) : (
            <PiHeartBold className="text-[18px] group-hover:text-pink-500" />
          )}
        </div>
        {tweet.likes.length > 0 && (
          <span
            className={`${
              isLiked ? "text-pink-500" : "group-hover:text-pink-500"
            } text-sm  absolute -end-1 `}
          >
            {tweet.likes.length}
          </span>
        )}
      </button>
      <button className=" hover:bg-blue-600/10 p-2 rounded-full transition cursor-pointer">
        <MdOutlineBookmarkBorder className="hover:text-blue-400  text-[20px]" />
      </button>
      <button className=" hover:bg-blue-600/10 p-2 rounded-full transition cursor-pointer">
        <RiShare2Line className="hover:text-blue-400 text-[18px]" />
      </button>
    </div>
  );
};

export default Buttons;
