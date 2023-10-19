"use client";

import Loader from "@/components/Loader";
import DeleteAlert from "@/components/UIComponets/DeleteAlert";
import Table from "@/components/UIComponets/Table";
import { rtkoptions } from "@/utils/rtkOption";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/redux/api/blogApi";
import BlogModal from "./components/BlogModal";

const AdminBlogPage = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [viewOrEdit, setViewOrEdit] = useState("none");
  const [selectedBlog, setSelectedBlog] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const { data } = useGetAllBlogsQuery(rtkoptions);
  const [deleteBlog, deleteblogResult] = useDeleteBlogMutation();

  useEffect(() => {
    if (data?.data) {
      const tempData = data?.data?.map((item, index) => {
        return {
          _id: item._id,
          title: item?.title,
          image: item?.image,
          publishedDate: item?.publishedDate,
          views: item?.views,
          description: item?.description,
        };
      });
      setAllBlogs(tempData);
      setLoading(false);
    }
  }, [data?.data]);

  const headers = [
    { name: "Title", key: "title" },
    { name: "Published Date", key: "publishedDate" },
    { name: "Views", key: "views" },
  ];

  const handleActionClick = async (type, id) => {
    const blog = allBlogs?.filter((item) => item._id === id);
    switch (type) {
      case "edit":
        setViewOrEdit(type);
        setShowBlogModal(true);
        setSelectedBlog(blog);
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
      const result = await deleteBlog(id);
      if (result?.data?.status === "success") {
        toast.success("Blog deleted successfully");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const filteredItems = allBlogs?.filter((item) => {
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
              setShowBlogModal(true);
            }}
            className={styles.addButton}
          >
            <Icon icon="ic:baseline-plus" fontSize={24} color={"white"} />
            Add New Blog
          </button>
        </div>
        <div className="h-[2px] w-[100%] bg-brand"></div>
      </div>

      <div className="shadow-xl px-2 py-3 rounded-md">
        <div className="flex justify-between items-center my-5">
          <h1 className="text-xl font-semibold">Blog Table</h1>
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
          data={filteredItems?.slice(10 * (page - 1), 10 * page)}
          showActions={{
            edit: true,
            delete: true,
            view: false,
            cancel: false,
          }}
          handleActionClick={handleActionClick}
          currentPage={page}
          setPage={setPage}
          itemsPerPage={10}
          totalPages={Math.ceil(filteredItems?.length / 10)}
        />

        {showBlogModal && (
          <BlogModal
            showBlogModal={showBlogModal}
            setShowBlogModal={setShowBlogModal}
            viewOrEdit={viewOrEdit}
            selectedBlog={selectedBlog}
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

export default AdminBlogPage;
