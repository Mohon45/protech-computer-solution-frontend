"use client";

import Loader from "@/components/Loader";
import DeleteAlert from "@/components/UIComponets/DeleteAlert";
import Table from "@/components/UIComponets/Table";
import {
  useDeleteFeedbackMutation,
  useGetAllFeedbacksQuery,
} from "@/redux/api/feedBackApi";
import { rtkoptions } from "@/utils/rtkOption";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminUserFeedback = () => {
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const { data } = useGetAllFeedbacksQuery(rtkoptions);
  const [deleteFeedback, deleteResult] = useDeleteFeedbackMutation();

  useEffect(() => {
    if (data?.data) {
      const tempdata = data.data?.map((item, index) => {
        return {
          _id: item._id,
          userName: item?.user?.name,
          description: item?.description,
          date: item?.createdAt?.split("T")[0],
        };
      });
      setAllFeedbacks(tempdata);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [data?.data]);

  const handleActionClick = async (type, id) => {
    switch (type) {
      case "edit":
        break;
      case "view":
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
      const result = await deleteFeedback(id);
      if (result?.data?.status === "success") {
        toast.success("Feedback deleted successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const headers = [
    { name: "User Name", key: "userName" },
    { name: "Feedback", key: "description" },
    { name: "Submit Date", key: "date" },
  ];
  return (
    <div className="py-10 px-8">
      {loading && <Loader forProcess={true} />}

      <div className="shadow-xl px-2 py-3 rounded-md">
        <div className="flex justify-between items-center my-5">
          <h1 className="text-xl font-semibold">User Feedback Table</h1>
          {/* <div className="relative">
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
          </div> */}
        </div>
        <Table
          headers={headers}
          data={allFeedbacks?.slice(10 * (page - 1), 10 * page)}
          showActions={{
            edit: false,
            delete: true,
            view: false,
            cancel: false,
          }}
          handleActionClick={handleActionClick}
          currentPage={page}
          setPage={setPage}
          itemsPerPage={10}
          totalPages={Math.ceil(allFeedbacks?.length / 10)}
        />
      </div>
    </div>
  );
};

export default AdminUserFeedback;
