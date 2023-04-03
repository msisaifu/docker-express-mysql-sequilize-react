import Navbar from "./Nav";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="p-4 sm:ml-64">
        <div className="h-screen p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-16">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
