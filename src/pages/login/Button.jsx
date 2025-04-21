import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Giriş yapıldı");
        navigate("/feed");
      })
      .catch((err) => {
        toast.error("Hata!" + err.code);
      });
  };
  return (
    <button
      onClick={handleLogin}
      className="bg-gray-100 hover:bg-gray-200 flex items-center justify-center  py-2 px-10 rounded-full text-gray-800  gap-x-2 font-[600] whitespace-nowrap "
    >
      <img src="g-logo.png" alt="google logo" className="h-[20px] " />
      <span>Google ile giriş yap</span>
    </button>
  );
};

export default Button;
