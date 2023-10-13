"use client";
import Image from "next/image";
import Link from "next/link";
import NavLogo from "../../assets/pro-tech1.png";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { useGetLoginUserQuery, useLogoutMutation } from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { setUser } from "@/redux/features/users/userSlice";
import { Modal } from "../UIComponets/Modal";
const cookies = new Cookies();

const NavbarPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [logout, logoutResult] = useLogoutMutation();
  const { data } = useGetLoginUserQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(setUser(data?.data));
  }, [data?.data]);

  const logOutHandler = async () => {
    try {
      await logout();
      dispatch(setUser(null));
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gradient-to-r  from-gradient-green  to-gradient-blue shadow-lg fixed top-0 left-0 right-0 z-[999] ">
      <div className="navbar w-[90%] mx-auto py-5">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link href="/" className=" text-xl">
            <Image alt="image " src={NavLogo} className="w-[150px] h-[50px]" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-dark">
            <li>
              <Link
                href="/"
                className="text-lg font-semibold hover:bg-transparent hover:text-brand"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg font-semibold hover:bg-transparent hover:text-brand"
              >
                Repair Services
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg font-semibold hover:bg-transparent hover:text-brand"
              >
                Software Services
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg font-semibold hover:bg-transparent hover:text-brand"
              >
                Other Services
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="text-lg font-semibold hover:bg-transparent hover:text-brand"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end ">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle"
                  onClick={() => router.push("/cart")}
                >
                  <div className="indicator">
                    <Icon icon="mdi:cart-outline" color="#04D98C" width={30} />
                    <span className="badge badge-sm indicator-item">0</span>
                  </div>
                </label>
              </div>

              <div className="dropdown dropdown-end ml-3">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar border-brand"
                >
                  <div className="w-10 rounded-full">
                    <img src="https://imgs.search.brave.com/6MWxoBks1KCoOjPTmpgIZxhinKNA1T8MiHjs-OlloVw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC8wMS83OC9t/YWxlLXByb2ZpbGUt/cGljdHVyZS1tYW4t/ZmFjZS1pbWFnZS13/ZWItYXZhdGFyLXZl/Y3Rvci00MjAwMDE3/OC5qcGc" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li onClick={() => setShowModal(true)}>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div>
              <Link
                href="/login"
                className="outline outline-1 outline-brand hover:bg-brand px-5 py-3 text-xl font-semibold rounded"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal
          title="Log out"
          width="w-[40%]"
          setModal={setShowModal}
          body={
            <div>
              <h1 className="text-xl font-bold text-center">
                Are you sure to log out
              </h1>
              <div className="w-[200px] mx-auto my-5">
                <button
                  className="bg-brand px-3 rounded text-white"
                  onClick={logOutHandler}
                >
                  Yes
                </button>
                <button
                  className="bg-brand px-3 rounded text-white ml-4"
                  onClick={() => setShowModal(false)}
                >
                  Exit
                </button>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default NavbarPage;
