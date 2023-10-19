"use client";

import Loader from "@/components/Loader";
import DeleteAlert from "@/components/UIComponets/DeleteAlert";
import Table from "@/components/UIComponets/Table";
import { rtkoptions } from "@/utils/rtkOption";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteBookingMutation,
  useGetAllBookingsQuery,
} from "@/redux/api/bookingApi";
import BookingModal from "./components/BookingModal";

const AdminBookingPage = () => {
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [viewOrEdit, setViewOrEdit] = useState("none");
  const [selectedBooking, setSelectedBooking] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useGetAllBookingsQuery(rtkoptions);

  const [deleteBooking, deleteBookingResult] = useDeleteBookingMutation();
  useEffect(() => {
    if (data?.data) {
      const tempData = data?.data?.map((item, index) => {
        return {
          _id: item._id,
          date: item?.date,
          time: item?.time,
          status: item?.status,
          serviceName: item?.service?.title,
          serviceCategory: item?.service?.category,
          serviceLocation: item?.service?.location,
          serviceMinPrice: item?.service?.minPrice,
          serviceMaxPrice: item?.service?.maxPrice,
          serviceDescription: item?.service?.description,
          serviceImage: item?.service?.image,
          userName: item?.user?.name,
          user: item?.user,
        };
      });
      setAllBookings(tempData);
      setLoading(false);
    }
  }, [data?.data]);

  const headers = [
    { name: "Booking Date", key: "date" },
    { name: "Booking Time", key: "time" },
    { name: "Service Name", key: "serviceName" },
    { name: "Service Category", key: "serviceCategory" },
    { name: "Location", key: "serviceLocation" },
    { name: "User Name", key: "userName" },
    { name: "Status", key: "status" },
  ];

  const handleActionClick = async (type, id) => {
    const booking = allBookings?.filter((item) => item._id === id);
    switch (type) {
      case "edit":
        break;
      case "view":
        setSelectedBooking(booking);
        setViewOrEdit("view");
        setShowBookingModal(true);
        break;
      case "delete":
        onDeleteHandler(id);
        break;
      case "cancel":
        break;
      default:
        break;
    }
  };

  const onDeleteHandler = (id) => {
    DeleteAlert(() => handleDelete(id));
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const result = await deleteBooking(id);
      if (result?.data?.status === "success") {
        toast.success("Booking deleted successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const filteredItems = allBookings?.filter((item) => {
    const isNameMatch =
      !searchTerm ||
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    return isNameMatch;
  });

  return (
    <div className="py-10 px-8">
      {loading && <Loader forProcess={true} />}

      <div className="shadow-xl px-2 py-3 rounded-md">
        <div className="flex justify-between items-center my-5">
          <h1 className="text-xl font-semibold">Booking Table</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="search a booking"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[100%] px-2 py-2 rounded-md focus:outline focus:outline-2 focus:outline-brand pr-10"
            />
            <Icon
              icon="ic:outline-search"
              className=" absolute top-2 right-2"
              fontSize={24}
              color={"gray"}
            />
          </div>
        </div>
        <Table
          headers={headers}
          data={allBookings?.slice(10 * (page - 1), 10 * page)}
          showActions={{
            edit: false,
            delete: true,
            view: true,
            cancel: false,
          }}
          handleActionClick={handleActionClick}
          currentPage={page}
          setPage={setPage}
          itemsPerPage={10}
          totalPages={Math.ceil(allBookings?.length / 10)}
        />

        {showBookingModal && (
          <BookingModal
            showBookingModal={showBookingModal}
            setShowBookingModal={setShowBookingModal}
            viewOrEdit={viewOrEdit}
            selectedBooking={selectedBooking}
          />
        )}
      </div>
    </div>
  );
};

export default AdminBookingPage;
