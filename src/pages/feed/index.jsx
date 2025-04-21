import Aside from "./aside";
import Main from "./main";
import Nav from "./nav";
import { useOutletContext } from "react-router-dom";
const Feed = () => {
  // Outlet componentdan gönderilen context propuna bu hook (useOutletContext) ile erişiyoruz
  const user = useOutletContext();
  // console.log(user);
  return (
    <div className="grid grid-cols-[1fr_minmax(300px,600px)_1fr] h-screen bg-black overflow-hidden text-white">
      <Nav user={user} />
      <Main user={user} />
      <Aside />
    </div>
  );
};

export default Feed;
