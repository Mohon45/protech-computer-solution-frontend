"use client";
import { useState } from "react";
import registerImage from "../../assets/sign-up.png";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <div className="hero py-5 bg-base-200">
        <div className="md:flex justify-evenly items-center">
          <div className="w-[40%]  text-center lg:text-left hidden md:block">
            <Image src={registerImage} className="w-[70%] mx-auto" />
          </div>
          <div className="md:w-[60%] mx-auto h-[500px] card flex-shrink-0 max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input outline outline-1 outline-brand focus:outline-brand"
                  required
                />
              </div>
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
                <button className="btn bg-brand font-bold">Sign Up</button>
                <Link
                  href="/login"
                  className="text-center mt-2 hover:text-brand"
                >
                  Already Registered? Please Logins
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
