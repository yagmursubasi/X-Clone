import { useState, useRef, useEffect } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { RiDeleteBinLine, RiEdit2Line } from "react-icons/ri";
import { BsStars, BsBarChart } from "react-icons/bs";
import { TbPinned } from "react-icons/tb";
import { PiChartBar, PiUserList } from "react-icons/pi";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { LuMegaphone } from "react-icons/lu";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import EditModal from "../modal/editModal";

const Dropdown = ({ tweet }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [editOpen, setEditOpen] = useState(false); // modal için

  //tweeti gönderen kişi ile şu an oturumu açık olan kişinin id`si aynı mı ?
  const isOwn = tweet.user.id === auth.currentUser.uid;

  // Menü dışına tıklanınca kapanmasını sağla
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // silme
  const handleDelete = () => {
    //silinecek dökümanın referansını al
    const tweetRef = doc(db, "tweets", tweet.id);
    //dökümanı kaldır
    deleteDoc(tweetRef)
      .then(() => toast.info("gönderi öğen silindi"))
      .catch(() => toast.error("Bir sorun oluştu"));
  };
  console.log(editOpen);
  return (
    isOwn && (
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-blue-600/10 p-2 rounded-full cursor-pointer transition"
        >
          <FiMoreHorizontal className="text-[#5d6165] hover:text-blue-400" />
        </div>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-72 bg-[#000000] shadow-amber-50/10 rounded-2xl shadow-xl border border-zinc-800 z-50 text-sm overflow-hidden">
            <ul className="text-[#e7e9ea]">
              <li className="hover:bg-zinc-700/40 px-4 py-3">
                <button
                  onClick={handleDelete}
                  className="w-full flex gap-3 items-center text-red-500 font-bold cursor-pointer"
                  type="button"
                >
                  <RiDeleteBinLine size={18} />
                  <span className="font-semibold">Sil</span>
                </button>
              </li>

              <li className="hover:bg-zinc-700/40 px-4 py-3">
                <button
                  onClick={() => setEditOpen(true)}
                  className="w-full flex gap-3 items-center cursor-pointer"
                  type="button"
                >
                  <RiEdit2Line size={18} />
                  <span className="font-semibold">Gönderiyi düzenle</span>
                </button>
              </li>

              <li className="hover:bg-zinc-700/40 px-4 py-3">
                <button
                  className="w-full flex gap-3 items-center cursor-pointer"
                  type="button"
                >
                  <TbPinned size={18} />
                  <span className="font-semibold">Profile sabitle</span>
                </button>
              </li>

              <li className="hover:bg-zinc-700/40 px-4 py-3 ">
                <button
                  className="w-full flex gap-3 items-center cursor-pointer"
                  type="button"
                >
                  <BsStars size={18} />
                  <span className="font-semibold">Profilinde öne çıkar</span>
                </button>
              </li>

              <li className="hover:bg-zinc-700/40 px-4 py-3 ">
                <button
                  className="w-full flex gap-3 items-center cursor-pointer"
                  type="button"
                >
                  <PiUserList size={30} />
                  <span className="font-semibold">
                    @yagmur_subasi kullanıcısını listelere ekle/listelerden
                    kaldır
                  </span>
                </button>
              </li>

              <li className="hover:bg-zinc-700/40 px-4 py-3 ">
                <button
                  className="w-full flex gap-3 items-center cursor-pointer"
                  type="button"
                >
                  <BiMessageRoundedDetail size={18} />
                  <span className="font-semibold">
                    Kimin yanıtlayabileceğini değiştir
                  </span>
                </button>
              </li>

              <li className="hover:bg-zinc-700/40 px-4 py-3">
                <button
                  className="w-full flex gap-3 items-center cursor-pointer"
                  type="button"
                >
                  <BsBarChart size={18} />
                  <span className="font-semibold">
                    Gönderi etkileşimini görüntüle
                  </span>
                </button>
              </li>

              <li className="hover:bg-zinc-700/40 px-4 py-3">
                <button
                  className="w-full flex gap-3 items-center cursor-pointer"
                  type="button"
                >
                  <PiChartBar size={18} />
                  <span className="font-semibold">
                    Gönderi istatistiklerini görüntüle
                  </span>
                </button>
              </li>

              <li className="hover:bg-zinc-700/40 px-4 py-3">
                <button
                  className="w-full flex gap-3 items-center cursor-pointer"
                  type="button"
                >
                  <LuMegaphone size={18} />
                  <span className="font-semibold">Topluluk notu iste</span>
                </button>
              </li>
            </ul>
          </div>
        )}
        <EditModal
          open={editOpen}
          close={() => {
            setEditOpen(false);
            setIsOpen(false);
          }}
          tweet={tweet}
        />
      </div>
    )
  );
};

export default Dropdown;
