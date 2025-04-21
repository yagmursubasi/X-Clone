import { doc, updateDoc } from "firebase/firestore";
import Modal from ".";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import uploadToStorage from "../../firebase/uploadToStorage";

const EditModal = ({ open, close, tweet }) => {
  const [text, setText] = useState("");
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  // Tweet geldiğinde textarea'yı güncelle
  useEffect(() => {
    if (tweet?.content?.text) {
      setText(tweet.content.text);
    }
  }, [tweet]);

  const handleSave = async (e) => {
    e.preventDefault();

    const file = e.target.elements["image"]?.files[0];
    const tweetRef = doc(db, "tweets", tweet.id);

    let updatedData = {
      "content.text": text,
      isEdited: true,
    };

    if (isImageDeleted) {
      updatedData["content.image"] = null;
    }

    if (file) {
      const imageUrl = await uploadToStorage(file);
      updatedData["content.image"] = imageUrl;
    }

    await updateDoc(tweetRef, updatedData);
    setIsImageDeleted(false);
    close();
  };

  return (
    <Modal isOpen={open} close={close}>
      <h2 className="text-xl font-bold text-white mb-4">Gönderiyi Düzenle</h2>
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          className="w-full p-4 text-white bg-zinc-900 border border-zinc-700 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Bir şeyler yaz..."
        />

        <label className="block mt-10 mb-2">Görsel Ekle / Değiştir </label>

        {!isImageDeleted && tweet?.content?.image ? (
          <button
            type="button"
            className="bg-zinc-700 p-1 align-center rounded-md text-zinc-300 hover:bg-zinc-800 transition cursor-pointer"
            onClick={() => setIsImageDeleted(true)}
          >
            Görseli kaldır
          </button>
        ) : (
          <input
            type="file"
            name="image"
            accept="image/*"
            className="block w-full text-sm text-gray-300
             file:mr-4 file:py-2 file:px-4
             file:rounded-md file:border-0
             file:text-sm file:font-semibold
             file:bg-blue-600 file:text-white
             hover:file:bg-blue-700
             bg-zinc-900"
          />
        )}

        <div className="flex justify-end mt-4 gap-2">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 rounded-md border border-zinc-600 text-zinc-300 hover:bg-zinc-800 transition cursor-pointer"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition cursor-pointer"
          >
            Kaydet
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditModal;
