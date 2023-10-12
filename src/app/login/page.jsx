"use client";
import Image from "next/image";
import loginImage from "../../assets/login-photo.png";
import { useState } from "react";
import Loader from "@/components/Loader";
import Link from "next/link";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <div className="hero py-5 bg-base-200">
        <div className="md:flex justify-evenly items-center">
          <div className="w-[50%]  text-center lg:text-left hidden md:block">
            <Image src={loginImage} className="w-[70%] mx-auto" />
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
                  className="input outline outline-1 outline-brand focus:outline-brand"
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
                  className="input outline outline-1 outline-brand focus:outline-brand"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn bg-brand font-bold">Login</button>
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
