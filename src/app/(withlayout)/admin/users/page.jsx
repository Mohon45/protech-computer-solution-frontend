"use client";

import Loader from "@/components/Loader";
import DeleteAlert from "@/components/UIComponets/DeleteAlert";
import Table from "@/components/UIComponets/Table";
import { useDeleteUserMutation, useGetAllUserQuery } from "@/redux/api/authApi";
import { rtkoptions } from "@/utils/rtkOption";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserModal from "./components/UserModal";

const ManageUsersPage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [viewOrEdit, setViewOrEdit] = useState("none");
  const [selectedUser, setSelectedUser] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetAllUserQuery(rtkoptions);

  const [deleteUser, deleteUserResult] = useDeleteUserMutation();
  useEffect(() => {
    if (data?.data) {
      setAllUsers(data?.data);
      setLoading(false);
    }
  }, [data?.data]);

  const headers = [
    { name: "Name", key: "name" },
    { name: "Phone Number", key: "phone" },
    { name: "Email", key: "email" },
    { name: "address", key: "address" },
  ];

  const handleActionClick = async (type, id) => {
    const user = allUsers?.filter((item) => item._id === id);
    switch (type) {
      case "edit":
        setViewOrEdit(type);
        setShowUserModal(true);
        setSelectedUser(user);
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
      const result = await deleteUser(id);
      if (result?.data?.status === "success") {
        toast.success("user deleted successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading;
    }
  };

  const filteredItems = allUsers?.filter((item) => {
    const isNameMatch =
      !searchTerm ||
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase());

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
              setShowUserModal(true);
            }}
            className={styles.addButton}
          >
            <Icon icon="ic:baseline-plus" fontSize={24} color={"white"} />
            Add New User
          </button>
        </div>
        <div className="h-[2px] w-[100%] bg-brand"></div>
      </div>

      <div className="shadow-xl px-2 py-3 rounded-md">
        <div className="flex justify-between items-center my-5">
          <h1 className="text-xl font-semibold">Users Table</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="search a user by name"
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

        {showUserModal && (
          <UserModal
            showUserModal={showUserModal}
            setShowUserModal={setShowUserModal}
            viewOrEdit={viewOrEdit}
            selectedUser={selectedUser}
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

export default ManageUsersPage;
