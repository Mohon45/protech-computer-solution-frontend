"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import PrivateRoute from "@/helper/RouteGuard";
import {
  useGetUserCartItemQuery,
  useRemoveCartItemMutation,
} from "@/redux/api/cartApi";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { data } = useGetUserCartItemQuery();
  const [removeCartItem, removeResult] = useRemoveCartItemMutation();

  useEffect(() => {
    if (data?.data) {
      setCartItems(data?.data?.cartItem);
      setLoading(false);
    }
  }, [data?.data]);

  const onCartItemRemoveHandler = async (data) => {
    setLoading(true);
    try {
      const result = await removeCartItem(data);
      if (result?.data) {
        toast.success("Item removed success!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <PrivateRoute>
      <div className="bg-gradient-to-r z-[-1] from-gradient-green  to-gradient-blue py-10">
        {loading && <Loader forProcess={true} />}
        <div className="w-[80%] h-[500px] mx-auto">
          <h1 className="md:text-3xl font-semibold">
            Here your all cart item list
          </h1>

          <div className="my-8">
            {cartItems?.map((item, index) => (
              <div
                className="outline outline-2 outline-brand mx-14 px-8 py-2 rounded-md flex justify-between items-center mb-5"
                key={index}
              >
                <div className="flex">
                  <Image
                    src={item?.image}
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] rounded"
                  />
                  <div className="ml-5">
                    <h1 className="text-xl font-semibold">{item?.title}</h1>
                    <p>Location : {item?.location}</p>
                    <p>Category : {item?.category}</p>
                    <p className="italic">{item?.date}</p>
                  </div>
                </div>
                <div>
                  <Icon
                    icon="fxemoji:crossmark"
                    width={30}
                    className="cursor-pointer"
                    onClick={() => onCartItemRemoveHandler(item)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
