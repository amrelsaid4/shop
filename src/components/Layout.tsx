import { Outlet } from "react-router-dom";
import TopSellers from "./TopSellers";
import PopularBlog from "./PopularBlog";

const Layout = () => {
  return (
    <div className="flex flex-row justify-center items-start w-full gap-8 p-5">
      <div className="flex-1 max-w-4xl">
        <Outlet />
      </div>
      <div className="w-64">
        <TopSellers />
        <PopularBlog />
      </div>
    </div>
  );
};

export default Layout;
