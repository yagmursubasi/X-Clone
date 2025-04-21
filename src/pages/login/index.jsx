import Button from "./Button";
import Form from "./Form";

const Login = () => {
  return (
    <div className="h-screen bg-[#000000] text-white grid place-items-center px-4">
      <div className="flex flex-col gap-13 justify-center mb-4 py-16 px-28 rounded-lg ">
        <div className="flex justify-center ">
          <img src="x-logo.webp" alt="logo" className="h-[60px] " />
        </div>

        <h1 className="text-4xl font-bold text-center">X’e Hoş Geldiniz!</h1>

        <Button />
        <Form />
      </div>
    </div>
  );
};

export default Login;
