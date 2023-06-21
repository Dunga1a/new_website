const Loading = () => {
  return (
    <div className="clowny-loading flex justify-center gap-3">
      <span className="bg-primaryColor w-3 h-3 rounded-full opacity-30 animate-pulse shadow-md"></span>
      <span
        className="bg-primaryColor w-3 h-3 rounded-full opacity-30 animate-pulse shadow-md"
        style={{
          animationDelay: "150ms",
        }}
      ></span>
      <span
        className="bg-primaryColor w-3 h-3 rounded-full opacity-30 animate-pulse shadow-md"
        style={{
          animationDelay: "300ms",
        }}
      ></span>
    </div>
  );
};

export default Loading;
