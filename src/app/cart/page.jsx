"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const page = () => {
  const user = useSelector((state) => state.user.user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);
  return (
    <div className="bg-gradient-to-r z-[-1] from-gradient-green  to-gradient-blue">
      <h1>This is Cart Section</h1>
    </div>
  );
};

export default page;
