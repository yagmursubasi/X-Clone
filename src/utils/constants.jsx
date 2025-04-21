import { PiDotsThreeCircle } from "react-icons/pi";
import { MdWorkOutline } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { GoHomeFill } from "react-icons/go";
import { GrNotification } from "react-icons/gr";
import { FaRegEnvelope, FaRegBookmark } from "react-icons/fa6";
import { IoFlashOutline, IoPersonOutline } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";

export const navSections = [
  {
    title: "Anasayfa",
    icon: <GoHomeFill className="text-[#e7e9ea] text-3xl" />,
  },
  {
    title: "Keşfet",
    icon: <BiSearch className="text-[#e7e9ea] text-3xl" />,
  },
  {
    title: "Bildirimler",
    icon: <GrNotification className="text-[#e7e9ea]" />,
  },
  {
    title: "Mesajlar",
    icon: <FaRegEnvelope className="text-[#e7e9ea]" />,
  },
  {
    title: "Grok",
    icon: <img src="grok.png" className="text-[#e7e9ea] w-7" />,
  },

  {
    title: "Yer İşaretleri",
    icon: <FaRegBookmark className="text-[#e7e9ea]" />,
  },
  {
    title: "İş İlanları",
    icon: <MdWorkOutline className="text-[#e7e9ea]" />,
  },
  {
    title: "Topluluklar",
    icon: <BsPeople className="text-[#e7e9ea] w-[700] " />,
  },
  {
    title: "Premium",
    icon: <BsTwitterX className="text-[#e7e9ea]" />,
  },
  {
    title: "Onaylı Kuruluşlar",
    icon: <IoFlashOutline className="text-[#e7e9ea] text-3xl " />,
  },
  {
    title: "Popfil",
    icon: <IoPersonOutline className="text-[#e7e9ea] text-2xl " />,
  },

  {
    title: "Daha Fazla",
    icon: <PiDotsThreeCircle className="text-[#e7e9ea] text-[27px] " />,
  },
];
