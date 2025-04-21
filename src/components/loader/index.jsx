const Loader = ({ design }) => {
  return (
    <div
      className={`w-7 h-7 border-3 border-t-blue-600 border-sky-950   rounded-full animate-spin ${design}`}
    ></div>
  );
};

export default Loader;
