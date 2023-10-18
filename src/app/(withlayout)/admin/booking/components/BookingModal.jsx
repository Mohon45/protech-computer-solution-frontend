import Loader from "@/components/Loader";
import { Modal } from "@/components/UIComponets/Modal";
import { useAdminUpdateBookingMutation } from "@/redux/api/bookingApi";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookingBody = (props) => {
  const [bookingDetails, setBookingDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [adminUpdateBooking, updateResult] = useAdminUpdateBookingMutation();

  useEffect(() => {
    if (props?.selectedBooking) {
      setBookingDetails(props?.selectedBooking[0]);
    }
  }, [props?.selectedBooking]);

  const submitHandler = async (status) => {
    setLoading(true);
    try {
      const tempData = {
        id: bookingDetails?._id,
        body: {
          status: status,
        },
      };
      const result = await adminUpdateBooking(tempData);
      if (result.data?.data) {
        toast.success("Booking status updated successfully");
        props.setShowBookingModal(false);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };
  return (
    <div>
      {loading && <Loader forProcess={true} />}
      <div className="flex mb-5">
        <h1 className="text-lg w-[50%] font-semibold">
          Booking Date : {bookingDetails?.date}
        </h1>
        <h1 className="text-lg w-[50%] font-semibold">
          Booking Time : {bookingDetails?.time}
        </h1>
      </div>
      <div>
        <h1 className="text-xl font-semibold">Service Details:</h1>
        <div className="w-[100%] flex my-3">
          <div className="w-[50%]">
            <h1>Name : {bookingDetails?.serviceName}</h1>
          </div>
          <div className="w-[50%]">
            <h1>Location : {bookingDetails?.serviceLocation}</h1>
          </div>
        </div>
      </div>
      <div className="my-5">
        <h1 className="text-xl font-semibold">User Details:</h1>
        <div className="w-[100%] flex my-3">
          <div className="w-[50%]">
            <h1>User Name : {bookingDetails?.userName}</h1>
            <h1>User Email : {bookingDetails?.user?.email}</h1>
          </div>
          <div className="w-[50%]">
            <h1>Phone Number : {bookingDetails?.user?.phone}</h1>
            <h1>Phone Address : {bookingDetails?.user?.address}</h1>
          </div>
        </div>
      </div>
      <div className="h-[1px] bg-brand"></div>
      <div className="mt-5">
        <div className="flex justify-between">
          <h1 className="font-semibold ">
            Booking Status :{" "}
            {bookingDetails?.status === "pending" ? (
              <span className="bg-brand px-3 py-1 rounded-md">Pending</span>
            ) : bookingDetails?.status === "approved" ? (
              <span className="bg-brand px-3 py-1 rounded-md">Approve</span>
            ) : bookingDetails?.status === "complete" ? (
              <span className="bg-brand px-3 py-1 rounded-md">Complete</span>
            ) : (
              <span className="bg-red text-white px-3 py-1 rounded-md">
                Rejected
              </span>
            )}
          </h1>
          <div className="ml-8 flex">
            {bookingDetails?.status === "pending" ? (
              <div className="flex">
                <div
                  className="flex items-center bg-brand px-4 text-white rounded-md cursor-pointer mr-3"
                  onClick={() => submitHandler("approved")}
                >
                  <Icon icon="charm:tick" width={25} />
                  <span className="text-lg ml-2">Accept</span>
                </div>
                <div
                  className="flex items-center bg-red px-4 text-white rounded-md cursor-pointer mr-3"
                  onClick={() => submitHandler("rejected")}
                >
                  <Icon icon="charm:tick" width={25} />
                  <span className="text-lg ml-2">Reject</span>
                </div>
              </div>
            ) : bookingDetails?.status === "approved" ? (
              <div
                className="flex items-center bg-brand px-4 text-white rounded-md cursor-pointer mr-3"
                onClick={() => submitHandler("complete")}
              >
                <Icon icon="charm:tick" width={25} />
                <span className="text-lg ml-2">Compete</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingModal = (props) => {
  return (
    <div>
      {props.showBookingModal && (
        <Modal
          title="Mange Booking Schedule"
          subtitle="Please see the following information to mange booking"
          setModal={props.setShowBookingModal}
          body={<BookingBody {...props} />}
        />
      )}
    </div>
  );
};

export default BookingModal;
