"use client";
import Image from "next/image";
import loginImage from "../../assets/login-photo.png";
import { useState } from "react";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useLoginMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/users/userSlice";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [login, loginResultresult] = useLoginMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const onchange = (e) => {
    setDisabled(true);

    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }

    if (email && password) {
      setDisabled(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newData = {
        email,
        password,
      };
      const result = await login(newData);
      if (result.data?.data) {
        let userData = result.data?.data;
        cookies.set("name", userData.name, {
          path: "/",
        });
        cookies.set("userId", userData._id, { path: "/" });
        cookies.set("role", userData.role, { path: "/" });
        dispatch(setUser(result.data?.data));
        router.push("/");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <div className="hero py-5 bg-base-200">
        <div className="md:flex justify-evenly items-center">
          <div className="w-[50%]  text-center lg:text-left hidden md:block">
            <Image alt="image " src={loginImage} className="w-[70%] mx-auto" />
          </div>
          <div className="md:w-[50%] mx-auto h-[400px] card flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input outline outline-1 outline-brand focus:outline-brand"
                  onChange={onchange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input outline outline-1 outline-brand focus:outline-brand"
                  onChange={onchange}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn bg-brand font-bold"
                  onClick={submitHandler}
                  disabled={disabled}
                >
                  Login
                </button>
                <Link
                  href="/register"
                  className="text-center mt-2 hover:text-brand"
                >
                  New User? Please Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
