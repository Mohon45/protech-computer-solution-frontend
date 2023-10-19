"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MainSideBarPage = () => {
  const [isActive, setIsActive] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user?.role === "user") {
      setIsActive("bookingHistory");
    }
    if (user?.role === "admin") {
      setIsActive("adminProfile");
    }
  }, [user]);
  return (
    <div>
      <aside
        className="z-30 w-64 overflow-y-hidden  bg-[#F2F4F6] lg:block shadow-lg "
        style={{ height: "calc(100vh - 100px)" }}
      >
        {user?.role === "user" ? (
          <h1 className="my-5 text-center font-semibold text-xl">
            User Dashboard
          </h1>
        ) : user?.role === "admin" ? (
          <h1 className="my-5 text-center font-semibold text-xl">
            Admin Dashboard
          </h1>
        ) : (
          <h1 className="my-5 text-center font-semibold text-xl">
            Super Admin Dashboard
          </h1>
        )}

        <div className="h-[2px] bg-brand"></div>

        {/* user sidebar */}
        {user?.role === "user" && (
          <div className="mt-2">
            <Link
              href="/user/bookingHistory"
              className=" text-lg font-semibold"
            >
              <div
                className={`${
                  isActive === "bookingHistory" &&
                  `border-l-[4px] border-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("bookingHistory")}
              >
                <Icon icon="wi:time-4" width={20} className="mr-2" />
                <h1>Booking History</h1>
              </div>
            </Link>

            <Link href="/user/feedback" className=" text-lg font-semibold">
              <div
                className={`${
                  isActive === "userfeedback" &&
                  `border-l-[4px] border-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("userfeedback")}
              >
                <Icon
                  icon="material-symbols:feedback-outline"
                  width={20}
                  className="mr-2"
                />
                <h1>Feedback</h1>
              </div>
            </Link>
          </div>
        )}

        {/* super admin sidebar */}
        {user?.role === "super_admin" && (
          <div className="mt-2">
            <Link
              href="/super-admin/profile"
              className=" text-lg font-semibold"
            >
              <div
                className={`${
                  isActive === "superadminProfile" &&
                  `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("superadminProfile")}
              >
                <Icon icon="gg:profile" width={25} className="mr-2" />
                <h1>Profile</h1>
              </div>
            </Link>

            <Link
              href="/super-admin/mange-admin"
              className=" text-lg font-semibold"
            >
              <div
                className={`${
                  isActive === "mangeAdmin" &&
                  `border-l-[4px] border-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("mangeAdmin")}
              >
                <Icon
                  icon="eos-icons:admin-outlined"
                  width={20}
                  className="mr-2"
                />
                <h1>Mange Admin</h1>
              </div>
            </Link>
          </div>
        )}

        {/* admin sidebar */}
        {(user?.role === "admin" || user?.role === "super_admin") && (
          <div className="mt-2">
            {user?.role === "admin" && (
              <Link href="/admin/profile" className=" text-lg font-semibold">
                <div
                  className={`${
                    isActive === "adminProfile" &&
                    `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
                  } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                  onClick={() => setIsActive("adminProfile")}
                >
                  <Icon icon="gg:profile" width={25} className="mr-2" />
                  <h1>Profile</h1>
                </div>
              </Link>
            )}

            <Link href="/admin/users" className=" text-lg font-semibold">
              <div
                className={`${
                  isActive === "users" &&
                  `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("users")}
              >
                <Icon
                  icon="majesticons:users-line"
                  width={25}
                  className="mr-2"
                />
                <h1>Users</h1>
              </div>
            </Link>

            <Link href="/admin/services" className=" text-lg font-semibold">
              <div
                className={`${
                  isActive === "services" &&
                  `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("services")}
              >
                <Icon icon="icons8:services" width={25} className="mr-2" />
                <h1>Services</h1>
              </div>
            </Link>
            <Link href="/admin/booking" className=" text-lg font-semibold">
              <div
                className={`${
                  isActive === "booking" &&
                  `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("booking")}
              >
                <Icon icon="bx:purchase-tag" width={25} className="mr-2" />
                <h1>Booking</h1>
              </div>
            </Link>
            <Link href="/admin/blogs" className=" text-lg font-semibold">
              <div
                className={`${
                  isActive === "blogs" &&
                  `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("blogs")}
              >
                <Icon icon="uil:blogger" width={25} className="mr-2" />
                <h1> Blogs</h1>
              </div>
            </Link>
            <Link href="/admin/faq" className=" text-lg font-semibold">
              <div
                className={`${
                  isActive === "faq" &&
                  `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("faq")}
              >
                <Icon icon="mdi:faq" width={25} className="mr-2" />
                <h1>FAQ</h1>
              </div>
            </Link>

            <Link href="/admin/userFeedback" className=" text-lg font-semibold">
              <div
                className={`${
                  isActive === "userFeedback" &&
                  `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
                } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
                onClick={() => setIsActive("userFeedback")}
              >
                <Icon
                  icon="fluent:person-feedback-48-regular"
                  width={25}
                  className="mr-2"
                />
                <h1> User Feedbacks</h1>
              </div>
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
};

export default MainSideBarPage;
