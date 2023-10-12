"use client";

import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import bannerImage from "../assets/home-banner.jpg";
import googleReview from "../assets/google-review.png";
import upcomingServiceImage from "../assets/upcoming-services.png";
import homeautomation from "../assets/home_automation.png";
import dataRecovery from "../assets/data-recovery.jpg";
import { Icon } from "@iconify/react";
import { useEffect } from "react";
import ServicePage from "@/components/UI/SpecifiqService";

export default function Home() {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);
  return (
    <main className="bg-gradient-to-r z-[-1] from-gradient-green  to-gradient-blue">
      <div>
        <div
          className="bg-[#eeeeeecb] p-6 w-[40%] ml-5 absolute bottom-20 rounded-tr-[70px] invisible md:visible"
          data-aos="fade-up"
          data-aos-easing="ease-in-out"
        >
          <h1 className="text-xl font-semibold">ProTech Computer Solutions</h1>
          <div className="flex justify-between items-center my-4">
            <Image src={googleReview} className="w-[150px]" />
            <h1 className="text-2xl font-bold">HUNDREDS OF 5 STAR REVIEWS</h1>
          </div>
          <div className="h-[1px] bg-gray-500"></div>
          <div className="my-5">
            <h1 className="text-2xl font-semibold">
              700+ Combined Reviews Across 2 Chicagoland Locations
            </h1>
            <button className="flex items-center bg-red-700 text-white px-5 py-4 rounded-lg mt-2">
              Book a service <Icon icon="pajamas:long-arrow" className="ml-2" />
            </button>
          </div>
        </div>
        <Image src={bannerImage} className="w-[100%] md:h-[90vh]" />
      </div>

      <div className="w-[90%] mx-auto py-8">
        <h1 className="text-xl md:text-5xl font-bold text-center flex items-center justify-center">
          We Fix All Devices{" "}
          <Icon icon="uiw:setting-o" className="mx-4 text-brand" /> Our Services
        </h1>
        <ServicePage />
      </div>

      <div>
        <h1 className="text-xl md:text-5xl font-bold text-center flex items-center justify-center pb-6">
          Our UpComing Services
        </h1>

        <div className="flex items-center">
          <div className="w-[50%]">
            <Image src={upcomingServiceImage} className="md:w-[60%] mx-auto" />
          </div>
          <div className="w-[50%] flex flex-col md:flex-row justify-evenly items-center">
            <div className="bg-brand w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-md py-5">
              <Image src={homeautomation} className="w-[60%] mx-auto" />
              <h1 className="md:text-xl font-semibold text-center">
                Home Automation
              </h1>
            </div>
            <div className="bg-brand w-[150px] h-[150px] mt-2 md:mt-0 md:w-[200px] md:h-[200px] rounded-md py-5">
              <Image
                src={dataRecovery}
                className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] mx-auto rounded-full"
              />
              <h1 className="md:text-xl font-semibold text-center mt-2">
                Data Recovery
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl md:text-5xl font-bold text-center flex items-center justify-center py-10">
          Amazing facts about ProTech
        </h1>
        <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          <div className="outline outline-2 outline-brand rounded-md">
            <Icon
              icon="icon-park-outline:every-user"
              width={70}
              color="#04D98C"
              className="mx-auto my-5"
            />
            <h1 className="text-3xl font-bold text-center">700 +</h1>
            <h3 className="text-2xl text-center font-semibold my-8">
              5 star Google reviews Rated 4.9 Stars!
            </h3>
          </div>
          <div className="outline outline-2 outline-brand rounded-md">
            <Icon
              icon="simple-line-icons:calender"
              width={70}
              color="#04D98C"
              className="mx-auto my-5"
            />
            <h1 className="text-3xl font-bold text-center">6</h1>
            <h3 className="text-2xl text-center font-semibold my-8">
              Days a Week Open
            </h3>
          </div>
          <div className="outline outline-2 outline-brand rounded-md">
            <Icon
              icon="mdi:archive-location-outline"
              width={70}
              color="#04D98C"
              className="mx-auto my-5"
            />
            <h1 className="text-3xl font-bold text-center">2</h1>
            <h3 className="text-2xl text-center font-semibold my-8">
              Convenient Locations
            </h3>
          </div>
          <div className="outline outline-2 outline-brand rounded-md">
            <Icon
              icon="iconoir:laptop-fix"
              width={70}
              color="#04D98C"
              className="mx-auto my-5"
            />
            <h1 className="text-3xl font-bold text-center">12 +</h1>
            <h3 className="text-2xl text-center font-semibold my-8">
              Years In Business
            </h3>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-2xl md:text-5xl font-bold text-center flex items-center justify-center py-10">
          Client Reviews
        </h1>
      </div>
    </main>
  );
}
