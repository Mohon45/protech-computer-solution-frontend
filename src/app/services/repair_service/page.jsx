"use client";

import Image from "next/image";
import Link from "next/link";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { rtkoptions } from "@/utils/rtkOption";

const RepairServicePage = () => {
  const [loading, setLoading] = useState(true);
  const [repairServices, setRepairServices] = useState([]);
  const { data } = useGetServicesQuery(rtkoptions);

  useEffect(() => {
    if (data?.data) {
      const tempData = data?.data?.filter((item) => item.category === "repair");
      setRepairServices(tempData);
      setLoading(false);
    }
  }, [data?.data]);

  return (
    <div className="bg-gradient-to-r from-gradient-green  to-gradient-blue">
      {loading && <Loader forProcess={true} />}
      <div>
        <h1 className="md:text-5xl font-semibold text-center pt-10 ">
          Repair Services
        </h1>
        <p className="w-[40%] mx-auto text-center py-6 text-lg">
          For Everything That Can Go Wrong With Your PC, Mobile, Etc. We Have a
          Solution! Our Shop Also Offers Board Level Component Repair!
        </p>
      </div>

      <div className="w-[90%] mx-auto pb-10 grid grid-cols-1 md:grid-cols-3 gap-y-10">
        {repairServices?.map((item, index) => (
          <div
            className="card w-96 mx-auto glass shadow-xl outline outline-1 outline-brand cursor-pointer"
            key={index}
          >
            <figure>
              <Image
                src={item?.image}
                alt="car!"
                className="w-[100%] h-[300px] border"
                width={100}
                height={200}
              />
            </figure>
            <Link
              href={`/services/${item._id}`}
              className="bg-brand font-semibold w-[150px] px-3 py-2 text-xl text-center rounded-md mx-auto absolute top-72 left-28"
            >
              Book Now
            </Link>
            <div className="card-body">
              <h2 className="card-title mt-3">{item?.title}</h2>
              <p>{item?.description.slice(0, 100)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepairServicePage;
