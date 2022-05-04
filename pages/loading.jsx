import { DoubleBounce } from "better-react-spinkit";
import Logo from "./../public/logo.png";

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
      <img src={Logo.src} alt=" " height={200} styles={{}} />
      <DoubleBounce color="#3CBC28" size={60} />
    </div>
  );
};

export default Loading;
