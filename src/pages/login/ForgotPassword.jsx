import { useRef, useState } from "react";
import Modal from "../../components/modal";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";

const ForgotPassword = () => {
  const [isOpen, setIsOpen] = useState();
  const inputRef = useRef();
  const handleReset = (e) => {
    e.preventDefault();
    const email = inputRef.current.value;
    console.log(email);
    // Burada şifre sıfırlama işlemini gerçekleştirin
    // Örneğin, Firebase kullanıyorsanız:
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info(
          "Şifre sıfırlama e-postası gönderildi.Lütfen kontrol ediniz."
        );
      })
      .catch((error) => {
        toast.error("Hata:Mail gönderilemedi", error);
      });
  };
  return (
    <>
      <span
        className="flex justify-end text-sm text-gray-400 hover:text-gray-300 mt-2 text-end cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        Şifreni mi unuttun?
      </span>

      <Modal isOpen={isOpen} close={() => setIsOpen(false)}>
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl">Şifreni mi unuttun?</h1>
          <p className="text-gray-400">
            Email adresine bir şifre sıfırlama bağlantısı göndereceğiz
          </p>

          <input
            name="email"
            type="email"
            className="text-black bg-white rounded p-1 mt-5 outline-none shadow-lg focus:shadow-gray"
            ref={inputRef}
            placeholder="Email adresini gir"
          />
          <button
            onClick={handleReset}
            className="bg-white hover:bg-gray-300 transition text-black font-bold rounded-full mt-8 py-1"
          >
            Gönder
          </button>
          <button className="bg-white hover:bg-gray-300 transition text-black font-bold rounded-full mt-3 py-1">
            İptal
          </button>
        </div>
      </Modal>
    </>
  );
};

export default ForgotPassword;
