import moment from "moment";
import { MdEdit } from "react-icons/md";

const User = ({ tweet }) => {
  console.log(tweet);
  const generateUsername = (name) =>
    name
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ş/g, "s")
      .replace(/ç/g, "c")
      .replace(/ğ/g, "g")
      .replace(/ü/g, "u")
      .replace(/ı/g, "i")
      .replace(/ö/g, "o")
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "");
  const initialUsername = generateUsername(tweet.user.name);
  //tarihi object veri formatına çevirdik
  let date = tweet.createdAt?.toDate();
  //moment kütüphanesi ile tweetin kaç zaman önce atıldığı formatına uyarlayacağım
  date = moment(date).fromNow(true);
  console.log(date);
  return (
    <div className="flex gap-1 items-center whitespace-nowrap justify-between">
      <span className="font-bold text-[#e7e9ea]">{tweet.user.name} </span>
      <span className="text-gray-500">@{initialUsername} </span>
      <span className="text-gray-500">· {date}</span>

      {tweet.isEdited && (
        <p>
          <MdEdit className="md:hidden text-gray-500" />
          <span className=" max-md:hidden text-gray-500 text-xs ml-2">
            (düzenlendi)
          </span>
        </p>
      )}
    </div>
  );
};

export default User;
