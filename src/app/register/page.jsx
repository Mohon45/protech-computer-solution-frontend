"use client";
import { useState } from "react";
import registerImage from "../../assets/sign-up.png";
import Image from "next/image";
import Link from "next/link";
import { useSignUpMutation } from "@/redux/api/authApi";
import Loader from "@/components/Loader";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [signUp, signUpresult] = useSignUpMutation();

  const onchange = (e) => {
    setDisabled(true);
    if (e.target.name === "name") {
      setName(e.target.value);
    }
    if (e.target.name === "email") {
      setEmail(e.target.value);
    }
    if (e.target.name === "password") {
      setPassword(e.target.value);
    }

    if (name && email && password) {
      setDisabled(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newData = {
        name,
        email,
        password,
      };
      const result = await signUp(newData);
      if (result.data?.data) {
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
                  name="name"
                  className="input outline outline-1 outline-brand focus:outline-brand"
                  onChange={onchange}
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
                  className="btn bg-brand font-bold hover:outline hover:outline-1 hover:outline-brand"
                  disabled={disabled}
                  onClick={submitHandler}
                >
                  Sign Up
                </button>
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
