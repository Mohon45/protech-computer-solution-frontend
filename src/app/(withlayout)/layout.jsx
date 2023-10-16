import MainSideBarPage from "@/components/UI/Sidebar";
import RootLayout from "../layout";

const DashboardLayout = ({ children }) => {
  return (
    <div
      className="flex bg-gray-50 dark:bg-gray-900 h-screen"
      style={{ height: "calc(100vh - 100px)" }}
    >
      <MainSideBarPage />

      <div className="flex flex-col flex-1 w-full overflow-y-scroll">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
// export default dynamic(() => Promise.resolve(DashboardLayout), {
//   ssr: false,
// });
