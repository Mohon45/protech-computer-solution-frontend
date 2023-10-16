"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";

const MainSideBarPage = () => {
  const [isActive, setIsActive] = useState(null);
  const user = useSelector((state) => state.user.user);
  console.log(user);
  return (
    <div>
      <aside
        className="z-30 w-64 overflow-y-hidden  bg-[#F2F4F6] lg:block shadow-lg "
        style={{ height: "calc(100vh - 100px)" }}
      >
        <h1 className="my-5 text-center font-semibold text-xl">
          User Dashboard
        </h1>
        <div className="h-[2px] bg-brand"></div>

        {/* user sidebar */}
        {user?.role === "user" && (
          <div className="mt-2">
            <div
              className={`${
                isActive === "bookingHistory" &&
                `border-l-[4px] border-brand bg-brand bg-opacity-20`
              } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
              onClick={() => setIsActive("bookingHistory")}
            >
              <Icon icon="wi:time-4" width={20} className="mr-2" />
              <Link
                href="/user/bookingHistory"
                className=" text-lg font-semibold"
              >
                Booking History
              </Link>
            </div>
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
              <Link href="/user/feedback" className=" text-lg font-semibold">
                Feedback
              </Link>
            </div>
          </div>
        )}

        {/* admin sidebar */}
        {user?.role === "admin" && (
          <div className="mt-2">
            <div
              className={`${
                isActive === "adminProfile" &&
                `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
              } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
              onClick={() => setIsActive("adminProfile")}
            >
              <Icon icon="gg:profile" width={25} className="mr-2" />
              <Link
                href="/admin/adminProfile"
                className=" text-lg font-semibold"
              >
                Profile
              </Link>
            </div>
            <div
              className={`${
                isActive === "users" &&
                `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
              } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
              onClick={() => setIsActive("users")}
            >
              <Icon icon="majesticons:users-line" width={25} className="mr-2" />
              <Link href="/admin/users" className=" text-lg font-semibold">
                Users
              </Link>
            </div>
            <div
              className={`${
                isActive === "services" &&
                `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
              } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
              onClick={() => setIsActive("services")}
            >
              <Icon icon="icons8:services" width={25} className="mr-2" />
              <Link href="/admin/services" className=" text-lg font-semibold">
                Services
              </Link>
            </div>
            <div
              className={`${
                isActive === "booking" &&
                `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
              } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
              onClick={() => setIsActive("booking")}
            >
              <Icon icon="bx:purchase-tag" width={25} className="mr-2" />
              <Link href="/admin/booking" className=" text-lg font-semibold">
                Booking
              </Link>
            </div>
            <div
              className={`${
                isActive === "blogs" &&
                `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
              } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
              onClick={() => setIsActive("blogs")}
            >
              <Icon icon="uil:blogger" width={25} className="mr-2" />
              <Link href="/admin/blogs" className=" text-lg font-semibold">
                Blogs
              </Link>
            </div>
            <div
              className={`${
                isActive === "faq" &&
                `border-l-[4px] border-brand text-brand bg-brand bg-opacity-20`
              } mb-2  flex px-6 items-center cursor-pointer py-2 hover:bg-brand hover:bg-opacity-20`}
              onClick={() => setIsActive("faq")}
            >
              <Icon icon="mdi:faq" width={25} className="mr-2" />
              <Link href="/admin/faq" className=" text-lg font-semibold">
                FAQ
              </Link>
            </div>
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
              <Link
                href="/admin/userFeedback"
                className=" text-lg font-semibold"
              >
                User Feedbacks
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default MainSideBarPage;
