"use client";

import Image from "next/image";
import phonePhoto from "../../../assets/pro-cover.png";
import process1 from "../../../assets/process1.png";
import process2 from "../../../assets/process2.png";
import process3 from "../../../assets/process3.png";
import process4 from "../../../assets/process4.png";

const ProcessPage = () => {
  return (
    <div className="w-[80%] mx-auto mb-10">
      <div className="w-[100%] flex justify-between p-5 shadow-xl">
        <div className="w-[35%]">
          <div className="flex">
            <div
              className=" w-[80px] h-[80px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#04d98b7e" }}
            >
              <Image
                src={process1}
                className="w-[40px] h-[40px]"
                alt="process image"
              />
            </div>
            <div className="w-[300px] ml-2">
              <h1 className="text-xl font-semibold">
                Step 1. Drop off or ship your device to us
              </h1>
              <p className="mt-4 text-justify">
                No appointment needed - feel free to visit one of our two
                Chicagoland locations or send your device through a courier. We
                are a UPS Access Point, but you can use USPS or FedEx, too!
              </p>
            </div>
          </div>
          <div className="flex mt-10">
            <div
              className=" w-[80px] h-[80px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#04d98b7e" }}
            >
              <Image
                src={process3}
                className="w-[40px] h-[40px]"
                alt="process image"
              />
            </div>
            <div className="w-[300px] ml-2">
              <h1 className="text-xl font-semibold">
                Step 3. Get Repair Estimate
              </h1>
              <p className="mt-4 text-justify">
                Give us a couple of days (1-3 business days), and we'll figure
                out what's wrong. We'll call you with a diagnosis and estimate
                with service options.
              </p>
            </div>
          </div>
        </div>
        <div className="w-[30%]">
          <Image src={phonePhoto} />
        </div>
        <div className="w-[35%]">
          <div className="flex">
            <div
              className=" w-[80px] h-[80px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#04d98b7e" }}
            >
              <Image
                src={process2}
                className="w-[40px] h-[40px]"
                alt="process image"
              />
            </div>
            <div className="w-[300px] ml-2">
              <h1 className="text-xl font-semibold">
                Step 2. Explain Your Issue
              </h1>
              <p className="mt-4 text-justify">
                Storm into our store in a rage and tell us all about how your
                device isn't working. We’ll give you a receipt after you drop it
                off or email you a receipt once received via courier.
              </p>
            </div>
          </div>
          <div className="flex mt-10">
            <div
              className=" w-[80px] h-[80px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#04d98b7e" }}
            >
              <Image
                src={process4}
                className="w-[40px] h-[40px]"
                alt="process image"
              />
            </div>
            <div className="w-[300px] ml-2">
              <h1 className="text-xl font-semibold">Step 4. Get Your Device</h1>
              <p className="mt-4 text-justify">
                You can either proceed with a repair or pick up as-is if you
                don't want service. Once the issue is fixed, come and pick up
                your device; or we will ship your device back via UPS Ground if
                you originally shipped it to us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessPage;
