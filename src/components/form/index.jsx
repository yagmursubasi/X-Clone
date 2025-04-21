import { IoImageOutline } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import { RiListRadio } from "react-icons/ri";
import { GrLocation } from "react-icons/gr";
import { BsEmojiSmile } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import uploadToStorage from "../../firebase/uploadToStorage";
import Loader from "../loader";
import React from "react";

const Form = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const removeImage = () => setImage(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const textValue = text.trim();
    const file = event.target.image.files[0];

    // yazı veya görsel yoksa gönderme
    if (!textValue && !file) return;

    try {
      //yüklenme başlayınca isLoadingi güncelle
      setIsLoading(true);
      //resmi firebase storage`a yükle
      const imageUrl = await uploadToStorage(file);

      //kolleksiyonun referansını al
      const tweetsCol = collection(db, "tweets");

      // kolleksiyon tweet belgesi oluştur
      await addDoc(tweetsCol, {
        content: {
          text,
          image: imageUrl,
        },
        isEdited: false,
        likes: [],
        user: {
          id: user.uid,
          name: user.displayName,
          photo: user.photoURL,
        },
        createdAt: serverTimestamp(),
      });
      // Form resetleme
      setText("");
      setImage(null);
      event.target.reset();
    } catch (error) {
      console.log(error);
    }
    //yüklenme bittikten sonra isLOadingi güncelle
    setIsLoading(false);
  };

  // Butonun aktif olup olmayacağını kontrol et
  const isDisabled = text.trim() === "" && !image;

  return (
    <form
      onSubmit={handleSubmit}
      className="border-b border-zinc-600 p-3 text-white"
    >
      <div className="flex gap-4">
        <img
          src={user.photoURL}
          className="size-[35px] md:size-[45px] rounded-full"
        />
        <div className="w-full relative">
          {isLoading && (
            <div className="absolute top-0 left-0 h-1 w-full bg-blue-500 animate-pulse transition-all duration-300"></div>
          )}
          <TextareaAutosize
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)} // textarea verisini güncelle
            placeholder="Neler oluyor?"
            className="w-full bg-black text-white resize-none outline-none placeholder-gray-500 pt-2"
          />

          {image && (
            <div className="relative mt-3 w-full rounded-xl overflow-hidden border border-zinc-600">
              <img
                src={image}
                alt="seçilen görsel"
                className="w-full max-h-[400px] object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1 rounded-full"
              >
                <IoCloseSharp className="text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="pt-8">
        <div className="flex justify-between items-center">
          <div className="flex gap-5 text-gray-500">
            <label htmlFor="image">
              <input
                name="image"
                type="file"
                id="image"
                className="hidden"
                onChange={onImageChange}
              />
              <IoImageOutline className="text-[#1D9BF0] text-xl cursor-pointer" />
            </label>
            <button type="button">
              <MdOutlineGifBox className="text-[#1D9BF0] text-xl cursor-pointer" />
            </button>
            <button type="button">
              <img
                src="grok-icon.png"
                className="bg-[#1D9BF0] w-5 cursor-pointer"
              />
            </button>
            <button type="button">
              <RiListRadio className="text-[#1D9BF0] text-xl cursor-pointer" />
            </button>
            <button type="button">
              <BsEmojiSmile className="text-[#1D9BF0] text-xl cursor-pointer" />
            </button>
            <button type="button">
              <GrLocation className="text-[#1D9BF0] text-xl cursor-pointer" />
            </button>
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`mt-2 px-4 py-2 rounded-full font-bold text-black text-sm transition-all ${
              isDisabled
                ? "bg-[#eff3f4] cursor-not-allowed opacity-60"
                : "bg-[#eff3f4] hover:bg-[#eff3f4e4] cursor-pointer"
            }`}
          >
            Gönderi yayınla
          </button>
        </div>
      </div>
    </form>
  );
};

export default React.memo(Form);
