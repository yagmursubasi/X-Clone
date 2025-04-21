const Content = ({ data }) => {
  if (!data) return null; // veya hata mesajı vs. dönebilirsin

  return (
    <div className="mt-2">
      {data.text && <p className="text-[#e7e9ea]">{data.text}</p>}
      {data.image && (
        <img
          src={data.image}
          alt="tweet görseli"
          className="mt-2 rounded-lg max-h-96 w-full object-cover"
        />
      )}
    </div>
  );
};

export default Content;
