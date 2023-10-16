"use client";

import Loader from "@/components/Loader";
import Input from "@/components/UIComponets/Input";
import { useGetServiceDetailsQuery } from "@/redux/api/serviceApi";
import { Icon } from "@iconify/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { InitialValues, validationSchema } from "./formikUtils";
import avatarImage from "../../../assets/avatar.png";
import Rating from "@/components/UIComponets/Rating";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { toast } from "react-toastify";
import { useAddNewCartItemMutation } from "@/redux/api/cartApi";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PrivateRoute from "@/helper/RouteGuard";
import dynamic from "next/dynamic";

const ServiceDetailsPage = ({ params }) => {
  const [serviceDetails, setServiceDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { data } = useGetServiceDetailsQuery(params.serviceId);
  const [createBooking, bookingResult] = useCreateBookingMutation();
  const [addNewCartItem, cartResult] = useAddNewCartItemMutation();
  const formikRef = useRef();

  useEffect(() => {
    if (data?.data) {
      setServiceDetails(data?.data);
      setLoading(false);
    }
  }, [data?.data]);

  const onSubmitBookingHandler = async (
    values,
    { setSubmitting, resetForm }
  ) => {
    setLoading(true);
    setSubmitting(true);
    try {
      values.service = serviceDetails?._id;
      const result = await createBooking(values);
      if (result?.data?.data) {
        toast.success("Service Successfully Booked");
        resetForm();
        setLoading(false);
        setSubmitting(false);
      }
    } catch (error) {
      toast.success("Service Booked Faild");
      console.log(error);
      setLoading(false);
      setSubmitting(false);
    }
  };

  const addCartHandler = async () => {
    setLoading(true);
    try {
      const tempData = {
        title: serviceDetails?.title,
        image: serviceDetails?.image,
        location: serviceDetails?.location,
        category: serviceDetails?.category,
        date: new Date().toISOString().split("T")[0],
        serviceId: serviceDetails?._id,
      };
      const result = await addNewCartItem(tempData);
      if (result?.data?.data) {
        toast.success("Service Cart Add successfully");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="bg-gradient-to-r from-gradient-green  to-gradient-blue py-10">
        {loading && <Loader forProcess={true} />}
        <div className="w-[80%] mx-auto">
          <div className=" flex">
            <div className="w-[50%]">
              <Image
                src={serviceDetails?.image}
                className="w-[80%]  h-[400px] rounded-md"
                width={100}
                height={100}
                alt="service image"
              />
              <h1 className="md:text-3xl font-semibold mt-6">
                {serviceDetails?.title}
              </h1>
              <p className="text-xl font-semibold my-3 flex items-center">
                <Icon
                  icon="mingcute:location-2-line"
                  width={40}
                  className="mr-2"
                />{" "}
                {serviceDetails?.location}
              </p>
              <div className="flex justify-between">
                <p className="text-xl font-semibold my-3 flex items-center">
                  <Icon icon="iconamoon:category" width={40} className="mr-2" />{" "}
                  {serviceDetails?.category}
                </p>
                <button
                  className="bg-brand h-[40px] px-6 text-white font-bold rounded-md flex items-center"
                  onClick={addCartHandler}
                >
                  Add to Cart{" "}
                  <Icon icon="mdi:cart-outline" width={20} className="ml-2" />
                </button>
              </div>
            </div>
            <div className="w-[50%]  flex justify-end">
              <div className="w-[80%]">
                <h1 className="md:text-2xl font-bold text-center">
                  Make a schedule for this service
                </h1>
                <div className=" shadow-xl p-5 mt-5 outline outline-1 outline-brand rounded-md">
                  <Formik
                    initialValues={InitialValues}
                    validationSchema={Yup.object(validationSchema)}
                    onSubmit={onSubmitBookingHandler}
                    innerRef={formikRef}
                    enableReinitialize={true}
                  >
                    {({ isSubmitting, values }) => (
                      <Form>
                        <div className="flex flex-col my-2">
                          <label
                            htmlFor="name"
                            className="text-[14px] font-medium pb-2"
                          >
                            Service Name
                          </label>
                          <Field
                            type="text"
                            value={serviceDetails?.title}
                            className="bg-input px-2 text-[14px] py-2 rounded-[6px] outline-none active:border-[1px] focus:border-[1px] border-brand"
                            readOnly
                          />
                        </div>
                        <Input
                          label="Valid Phone Number"
                          name="validPhoneNumber"
                          type="text"
                          placeholder="valid phone number"
                        />
                        <Input
                          label="Date"
                          name="date"
                          type="date"
                          placeholder="booking date"
                        />
                        <Input
                          label="Time"
                          name="time"
                          type="time"
                          placeholder="Booking time"
                        />

                        <div className="flex">
                          <button
                            type="submit"
                            className="my-0 mx-0 bg-brand hover:bg-brand hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] w-[130px] py-2 px-3 mt-2 rounded-md flex justify-center items-center font-semibold"
                          >
                            {isSubmitting ? (
                              <Icon
                                icon="eos-icons:loading"
                                className="text-[24px]"
                              />
                            ) : (
                              "Booking"
                            )}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold">
              {serviceDetails?.description}
            </p>
            <div className="h-[2px] bg-brand my-6"></div>
            <div>
              <h1 className="text-2xl font-semibold">User Reviews :</h1>

              <div className="my-5 px-10">
                {serviceDetails?.reviews?.map((item, index) => (
                  <div
                    className="flex items-center shadow-xl px-6 py-4 outline outline-1 outline-brand rounded-md"
                    key={index}
                  >
                    <Image
                      src={avatarImage}
                      alt="avatar image"
                      className="w-[60px] h-[60px] rounded-full"
                    />
                    <div className="ml-6">
                      <p className="mb-6">{item?.comments}</p>
                      <p className="italic mb-2">{item?.userName}</p>
                      <Rating rating={item?.rating} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default dynamic(() => Promise.resolve(ServiceDetailsPage), {
  ssr: false,
});
