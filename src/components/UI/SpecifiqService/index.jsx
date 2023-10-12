import { Icon } from "@iconify/react";
import React, { useState } from "react";

import Image from "next/image";
import PhoneRepair from "./components/PhoneRepair";
import PcRepair from "./components/PcRepair";
import MacbookRepair from "./components/MacbookRepair";
import MotherboardRepair from "./components/MotherboardRepair";

const ServicePage = () => {
  const [phone, setPhone] = useState(true);
  const [pc, setPc] = useState(false);
  const [macbook, setMacbook] = useState(false);
  const [motherboard, setMotherboard] = useState(false);
  const onclickHandler = (name) => {
    if (name === "phone") {
      setPhone(true);
      setPc(false);
      setMacbook(false);
      setMotherboard(false);
    }
    if (name === "pc") {
      setPhone(false);
      setPc(true);
      setMacbook(false);
      setMotherboard(false);
    }
    if (name === "macbook") {
      setPhone(false);
      setPc(false);
      setMacbook(true);
      setMotherboard(false);
    }
    if (name === "motherboard") {
      setPhone(false);
      setPc(false);
      setMacbook(false);
      setMotherboard(true);
    }
  };
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-8">
        <div
          className="w-[250px] text-center shadow-xl  py-5 hover:bg-brand rounded-md outline outline-1 outline-brand cursor-pointer hover:text-white my-3"
          onClick={() => onclickHandler("phone")}
        >
          <Icon icon="fa:mobile-phone" width={50} className="mx-auto" />
          <h1 className="text-xl font-bold my-4">IPHONE / IPAD REPAIR</h1>
        </div>
        <div
          className="w-[250px] text-center shadow-xl  py-5 hover:bg-brand rounded-md outline outline-1 outline-brand cursor-pointer hover:text-white my-3"
          onClick={() => onclickHandler("pc")}
        >
          <Icon
            icon="fluent:desktop-checkmark-20-regular"
            width={90}
            className="mx-auto"
          />
          <h1 className="text-xl font-bold my-4">PC / LAPTOP REPAIR</h1>
        </div>
        <div
          className="w-[250px] text-center shadow-xl  py-5 hover:bg-brand rounded-md outline outline-1 outline-brand cursor-pointer hover:text-white my-3"
          onClick={() => onclickHandler("macbook")}
        >
          <Icon icon="ic:outline-laptop-mac" width={90} className="mx-auto" />
          <h1 className="text-xl font-bold my-4">MACBOOK REPAIR</h1>
        </div>
        <div
          className="w-[250px] text-center shadow-xl  py-5 hover:bg-brand rounded-md outline outline-1 outline-brand cursor-pointer hover:text-white my-3"
          onClick={() => onclickHandler("motherboard")}
        >
          <Icon icon="bi:motherboard" width={80} className="mx-auto" />
          <h1 className="text-xl font-bold my-4">MOTHERBOARD </h1>
        </div>
        <div
          className="w-[250px] text-center shadow-xl  py-5 hover:bg-brand rounded-md outline outline-1 outline-brand cursor-pointer hover:text-white my-3"
          onClick={() => onclickHandler("others")}
        >
          <Icon icon="ic:round-read-more" width={80} className="mx-auto" />
          <h1 className="text-xl font-bold my-4">OTHERS</h1>
        </div>
      </div>

      <div className="w-[80%] h-[400px] mx-auto  my-8 rounded-md shadow-2xl hidden md:block">
        {phone && <PhoneRepair />}
        {pc && <PcRepair />}
        {macbook && <MacbookRepair />}
        {motherboard && <MotherboardRepair />}
      </div>
    </div>
  );
};

export default ServicePage;
