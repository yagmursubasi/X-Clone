import { useState } from "react";
import { useFormik } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ForgotPassword from "./forgotPassword";

const Form = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      const { email, password } = values;

      if (isSignUp) {
        // Create a new user
        createUserWithEmailAndPassword(auth, email, password)
          .then((res) => {
            // Send email verification
            sendEmailVerification(res.user);
            toast.info(
              "Email adresinize doğrulama linki gönderildi. Lütfen kontrol edin."
            );
            setIsSignUp(false);
            resetForm();
          })
          .catch((error) => {
            toast.error("Bir hata oluştu: " + error.code);
          });
      } else {
        // Sign in the user
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            toast.success("Hesaba giriş yapıldı.");
            navigate("/feed");
          })
          .catch((error) => {
            toast.error("Bir hata oluştu: " + error.code);
          });
      }
    },
  });

  return (
    <>
      <form className="flex flex-col" onSubmit={formik.handleSubmit}>
        {isSignUp && (
          <>
            <label>İsim</label>
            <input
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="text-black bg-amber-50 rounded mt-1 p-1 outline-none shadow-lg focus:shadow-gray"
            />

            <label className="mt-5">Kullanıcı Adı</label>
            <input
              name="username"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              className="text-black bg-amber-50 rounded mt-1 p-1 outline-none shadow-lg focus:shadow-gray"
            />
          </>
        )}

        <label className="mt-5">Email</label>
        <input
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="text-black bg-amber-50 rounded mt-1 p-1 outline-none shadow-lg focus:shadow-gray"
        />

        <label className="mt-5">Şifre</label>
        <div className="relative">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            value={formik.values.password}
            className="text-black bg-amber-50 rounded mt-1 p-1 outline-none shadow-lg focus:shadow-gray w-full pr-10"
          />

          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={20} />
            ) : (
              <AiOutlineEye size={20} />
            )}
          </button>
        </div>
        {!isSignUp && <ForgotPassword />}

        <button
          type="submit"
          className="mt-10 bg-[#131212] text-blue-500 rounded-full p-1 font-bold border border-gray-500 hover:border-blue-400 cursor-pointer transition hover:bg-gray-800"
        >
          {isSignUp ? "Kaydol" : "Giriş Yap"}
        </button>

        <p className="mt-7 text-center">
          <span className="text-gray-500">
            {isSignUp ? "Hesabınız varsa" : "Hesabınız yoksa"}
          </span>
          <span
            onClick={() => setIsSignUp(!isSignUp)}
            className="cursor-pointer ms-2 text-blue-500 hover:underline"
          >
            {isSignUp ? "Giriş Yapın" : "Kaydolun"}
          </span>
        </p>
      </form>
    </>
  );
};

export default Form;
