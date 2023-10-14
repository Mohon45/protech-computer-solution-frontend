"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { rtkoptions } from "@/utils/rtkOption";

const AllServicePage = () => {
  const [loading, setLoading] = useState(true);
  const [allServices, setAllServices] = useState([]);
  const [priceRange, setPriceRange] = useState(100000);
  const [searchTerm, setSearchTerm] = useState("");
  const { data } = useGetServicesQuery(rtkoptions);

  useEffect(() => {
    if (data?.data) {
      setAllServices(data?.data);
      setLoading(false);
    }
  }, [data?.data]);

  const filteredItems = allServices?.filter((item) => {
    const isNameMatch =
      !searchTerm ||
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.category?.toLowerCase().includes(searchTerm.toLowerCase());

    const isPriceMatch = !priceRange || item?.maxPrice <= priceRange;

    return isNameMatch && isPriceMatch;
  });

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="bg-gradient-to-r from-gradient-green  to-gradient-blue py-10">
      {loading && <Loader forProcess={true} />}
      <div className="w-[95%] h-[80vh] mx-auto flex justify-between">
        <div className="w-[20%] h-[400px] shadow-xl p-4 outline outline-2 outline-brand rounded-md mb-6 mt-5">
          <div className="relative my-10">
            <input
              type="text"
              placeholder="search a service"
              onChange={handleSearchChange}
              className="w-[100%] px-2 py-2 rounded-md focus:outline focus:outline-2 focus:outline-brand pr-10"
            />
            <Icon
              icon="ic:outline-search"
              className=" absolute top-2 right-2"
              fontSize={24}
              color={"gray"}
            />
          </div>

          <div className="mt-10">
            <div className="flex justify-between">
              <p className="font-semibold mb-2">Filter Price Range</p>
              <p>{priceRange}</p>
            </div>

            <input
              type="range"
              min={0}
              max={100000}
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="range range-success range-xs"
            />
          </div>
        </div>

        <div className="w-[80%] px-2 py-5 overflow-y-scroll">
          <div className=" pb-10 grid grid-cols-1 md:grid-cols-3 gap-y-10">
            {filteredItems?.map((item, index) => (
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
      </div>
    </div>
  );
};

export default AllServicePage;
