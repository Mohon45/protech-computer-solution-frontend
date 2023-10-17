"use client";

import Loader from "@/components/Loader";
import DeleteAlert from "@/components/UIComponets/DeleteAlert";
import Table from "@/components/UIComponets/Table";
import { rtkoptions } from "@/utils/rtkOption";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "@/redux/api/serviceApi";
import ServiceModal from "./components/ServiceModal";

const AdminServicePage = () => {
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [viewOrEdit, setViewOrEdit] = useState("none");
  const [selectedService, setSelectedService] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetServicesQuery(rtkoptions);

  const [deleteService, deleteServiceResult] = useDeleteServiceMutation();
  useEffect(() => {
    if (data?.data) {
      const tempData = data?.data?.map((item, index) => {
        return {
          _id: item._id,
          title: item?.title,
          category: item?.category,
          location: item?.location,
          minPrice: item?.minPrice,
          maxPrice: item?.maxPrice,
          reviews: item?.reviews?.length,
          description: item?.description,
          image: item?.image,
        };
      });
      setAllServices(tempData);
      setLoading(false);
    }
  }, [data?.data]);

  const headers = [
    { name: "Name", key: "title" },
    { name: "Category", key: "category" },
    { name: "Location", key: "location" },
    { name: "Min Price", key: "minPrice" },
    { name: "Max Price", key: "maxPrice" },
    { name: "Total Review", key: "reviews" },
  ];

  const handleActionClick = async (type, id) => {
    const user = allServices?.filter((item) => item._id === id);
    switch (type) {
      case "edit":
        setViewOrEdit(type);
        setShowServiceModal(true);
        setSelectedService(user);
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
      const result = await deleteService(id);
      if (result?.data?.status === "success") {
        toast.success("Service deleted successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading;
    }
  };

  const filteredItems = allServices?.filter((item) => {
    const isNameMatch =
      !searchTerm ||
      item?.title?.toLowerCase().includes(searchTerm.toLowerCase());

    return isNameMatch;
  });

  return (
    <div className="py-10 px-8">
      {loading && <Loader forProcess={true} />}
      <div className="flex items-center gap-3 mb-5">
        <div>
          <button
            onClick={() => {
              setViewOrEdit("none");
              setShowServiceModal(true);
            }}
            className={styles.addButton}
          >
            <Icon icon="ic:baseline-plus" fontSize={24} color={"white"} />
            Add New Service
          </button>
        </div>
        <div className="h-[2px] w-[100%] bg-brand"></div>
      </div>

      <div className="shadow-xl px-2 py-3 rounded-md">
        <div className="flex justify-between items-center my-5">
          <h1 className="text-xl font-semibold">Service Table</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="search a service by name"
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
          data={filteredItems ?? []}
          showActions={{
            edit: true,
            delete: true,
            view: false,
            cancel: false,
          }}
          handleActionClick={handleActionClick}
        />

        {showServiceModal && (
          <ServiceModal
            showServiceModal={showServiceModal}
            setShowServiceModal={setShowServiceModal}
            viewOrEdit={viewOrEdit}
            selectedService={selectedService}
          />
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: "ml-[20px]",
  pageTitle: "text-[24px] font-black mt-4",
  addWrapper: "flex items-center mt-10 w-[95%]",
  addButton:
    "my-0 mx-0 bg-brand hover:bg-brand hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] min-w-[180px] py-3 px-3 rounded-md flex justify-center items-center",
  Input:
    "text-[14px] rounded-md my-0 outline-none font-regular py-2 pl-[35px] bg-gray bg-opacity-10",
};

export default AdminServicePage;
