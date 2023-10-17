"use client";

import Loader from "@/components/Loader";
import Table from "@/components/UIComponets/Table";
import {
  useGetUserBookingsQuery,
  useUserUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { rtkoptions } from "@/utils/rtkOption";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserBookingHistoryPage = () => {
  const [allBookingHistory, setAllBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data } = useGetUserBookingsQuery(rtkoptions);
  const [userUpdateBooking, resultUpdate] = useUserUpdateBookingMutation();

  useEffect(() => {
    if (data?.data) {
      const tempData = data?.data?.map((item, index) => {
        return {
          _id: item._id,
          bookingDate: item?.date,
          serviceName: item?.service?.title,
          location: item?.service?.location,
          status: item?.status,
          time: item?.time,
        };
      });
      setAllBookingHistory(tempData);
      setLoading(false);
    }
  }, [data?.data]);

  const updateBookigStatusHandler = async (id) => {
    setLoading(true);
    try {
      const result = await userUpdateBooking(id);
      console.log(result);
      if (result?.data?.data) {
        toast.success("SuccessFully Cancel Your Booking");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  let headersTemp = [
    { name: "Booking Date", key: "bookingDate" },
    { name: "Booking Time", key: "time" },
    { name: "Service Name", key: "serviceName" },
    { name: "Location", key: "location" },
    { name: "Status", key: "status" },
  ];

  const handleActionClick = async (type, id) => {
    switch (type) {
      case "edit":
        break;
      case "view":
        break;
      case "delete":
        break;
      case "cancel":
        await updateBookigStatusHandler(id);
        break;
      default:
        break;
    }
  };

  return (
    <div className="py-10 px-8">
      {loading && <Loader forProcess={true} />}
      <Table
        headers={headersTemp}
        data={allBookingHistory}
        showActions={{
          edit: false,
          delete: false,
          view: false,
          cancel: true,
        }}
        handleActionClick={handleActionClick}
      />
    </div>
  );
};

export default UserBookingHistoryPage;
