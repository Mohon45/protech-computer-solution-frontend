"use client";

import Image from "next/image";
import faqImage from "../../assets/faq.png";
import Accordian from "@/components/UIComponets/Accordian";
import { useEffect, useState } from "react";
import { useGetAllFaqQuery } from "@/redux/api/faqApi";
import { Icon } from "@iconify/react";

const ContactPage = () => {
  const [allFaqs, setAllFaqs] = useState([]);
  const { data } = useGetAllFaqQuery();

  useEffect(() => {
    if (data?.data) {
      setAllFaqs(data?.data);
    }
  }, [data?.data]);
  return (
    <div className="py-10 w-[90%] mx-auto">
      <div className="w-[100%] flex items-center">
        <div className="w-[50%]">
          <Image src={faqImage} className="w-[60%] mx-auto" alt="faq image" />
        </div>
        <div className="w-[50%] h-[400px] overflow-y-scroll">
          {allFaqs?.map((item, index) => (
            <Accordian
              key={index}
              question={item?.question}
              answer={item?.answar}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 ">
        <h1 className="text-4xl font-semibold text-center mb-5">
          GET IN TOUCH
        </h1>
        <div className="w-[60%] mx-auto shadow-xl bg-[#caf0e06e] p-6">
          <input
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full focus:outline focus:outline-2 focus:outline-brand focus:border-none mb-3"
          />
          <input
            type="text"
            placeholder="Your Email Address"
            className="input input-bordered w-full  focus:outline focus:outline-2 focus:outline-brand focus:border-none mb-3"
          />
          <input
            type="text"
            placeholder="Your Phone Number"
            className="input input-bordered w-full focus:outline focus:outline-2 focus:outline-brand focus:border-none mb-3"
          />
          <textarea
            className="input input-bordered w-full  focus:outline focus:outline-2 focus:outline-brand focus:border-none mb-3 h-40"
            placeholder="Message"
          ></textarea>
          <button
            className="my-0 mx-0 bg-brand hover:bg-brand hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] w-[130px] py-2 px-3 mt-2 rounded-md flex justify-center items-center font-semibold "
            type="reset"
          >
            <Icon icon="mingcute:send-fill" className="mr-3" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
