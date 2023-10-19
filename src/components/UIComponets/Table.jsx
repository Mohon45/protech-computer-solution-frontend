"use client";

import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { useRouter } from "next/navigation";

const Table = ({
  headers,
  data,
  showActions = {
    edit: false,
    delete: false,
    view: false,
    details: false,
    cancel: false,
  },
  handleActionClick,
}) => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const router = useRouter();
  const getItemData = (rowItem, itemKey, headerItem = null) => {
    let keys = itemKey.split(".");
    let item = "";
    let tempItem = { ...rowItem };
    keys.forEach((key, index) => {
      tempItem = tempItem[key];
      item = tempItem;
    });

    let res = headerItem?.type === "date" ? item?.split("T")[0] : item;

    return res;
  };

  const shouldShowActions = (item) => {
    return (
      showActions.edit ||
      showActions.delete ||
      showActions.view ||
      showActions.details ||
      showActions.cancel
    );
  };

  useEffect(() => {
    setRows(data);
  }, [data]);

  if (data === undefined) {
    return <Loader forProcess={true} />;
  } else
    return (
      <div className="relative">
        <table className="table-auto w-[100%]">
          <thead>
            <tr className="w-[100%] text-left bg-brand font-semibold">
              <th className="py-3 px-2">SI</th>
              {headers?.map((x, index) => (
                <th key={index} className="py-3 px-2">
                  <div className="flex items-center gap-1">{x?.name}</div>
                </th>
              ))}
              {(showActions.edit ||
                showActions.delete ||
                showActions.view ||
                showActions.details ||
                showActions.cancel) && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {rows?.map((item, index) => (
              <tr
                key={item._id + index}
                className={`
                    ${index % 2 === 0 ? "bg-[#FAFDFB]" : "bg-[#E4F2EB]"} 
                    py-2 text-[14px] font-medium`}
              >
                <td className="pl-4 py-3 w-[5%]">{index + 1}</td>
                {headers.map((x, index) => (
                  <td className="pl-2 py-3 ">
                    {getItemData(item, x.key, x) ?? "Unavailable"}
                  </td>
                ))}
                {shouldShowActions(item) ? (
                  <td className="pl-2 py-3 w-[100%] flex gap-2">
                    {showActions.view && (
                      <div title="View">
                        <Icon
                          onClick={() => handleActionClick("view", item._id)}
                          icon="basil:eye-solid"
                          className="text-[30px] hover:scale-105 duration-75 text-gray hover:text-brand mr-2 cursor-pointer"
                        />
                      </div>
                    )}
                    {showActions.edit && (
                      <div title="Edit">
                        <Icon
                          icon="material-symbols:edit-square-outline"
                          className="text-[22px] text-gray hover:text-brand hover:cursor-pointer"
                          onClick={() => handleActionClick("edit", item._id)}
                        />
                      </div>
                    )}
                    {showActions.details && (
                      <div title="details">
                        <div title="View">
                          <Icon
                            onClick={() =>
                              router.push(`/services/${item.servie_id}`)
                            }
                            icon="basil:eye-solid"
                            className="text-[30px] hover:scale-105 duration-75 text-gray hover:text-brand mr-2 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}
                    {showActions.cancel && (
                      <div title="Cancel">
                        <button
                          className={`${
                            item?.status === "cancled" && `bg-opacity-25`
                          } bg-red  px-3 text-white text-lg rounded-md`}
                          onClick={() => handleActionClick("cancel", item._id)}
                          disabled={item?.status === "cancled"}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {showActions.delete && (
                      <div title="Delete">
                        <Icon
                          onClick={() => handleActionClick("delete", item._id)}
                          icon="ic:outline-delete"
                          className="text-[24px] text-gray hover:text-red hover:cursor-pointer"
                        />
                      </div>
                    )}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>

        {/* <div className="sticky bg-white py-2 bottom-0 left-0 right-0">
          {currentPage ? (
            <Pagination
              currentPage={currentPageValue}
              itemsPerPage={itemsPerPage}
              totalPages={totalPages}
              setPage={setPage}
              setCurrentPage={setCurrentPageValue}
            />
          ) : null}
        </div> */}
      </div>
    );
};
const styles = {
  Input:
    "text-[14px] rounded-md my-0 outline-none font-regular py-2 pl-[35px] bg-gray bg-opacity-10",
};

export default Table;
