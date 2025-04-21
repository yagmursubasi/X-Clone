//Hihger-order component yazarak modallerin ortak olan kapsayıcılarını burada yazarak kod tekrarına düşmeyi önleyebiliriz.

import { IoMdClose } from "react-icons/io";

const Modal = ({ children, isOpen, close }) => {
  return (
    isOpen && (
      <div className="fixed inset-0  bg-zinc-800/50 backdrop-blur-sm z-[9999] grid place-items-center">
        <div className="bg-black *:/70 rounded-lg shadow-lg py-10 w-3/4 px-8 max-w-[600px] sm:w-[500px] flex flex-col gap-5 relative">
          <div className="flex justify-end ">
            <button className="" onClick={close}>
              <IoMdClose
                size={24}
                className="text-3xl transition hover:text-gray-500 cursor-pointer"
              />
            </button>
          </div>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
