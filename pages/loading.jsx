import { DoubleBounce } from "better-react-spinkit";

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/768px-WhatsApp.svg.png"
        alt=" "
        height={200}
        styles={{}}
      />
      <DoubleBounce color="#3CBC28" size={60} />
    </div>
  );
};

export default Loading;
