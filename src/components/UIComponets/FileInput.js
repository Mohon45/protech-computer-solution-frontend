"use client";

import React, { useState } from "react";
import { Field, ErrorMessage, useField } from "formik";
import axios from "axios";
import Loader from "../Loader";

const FileInput = ({ label, name, ...rest }) => {
  const [field, meta, helpers] = useField({ name });
  const [loading, setLoading] = useState(false);

  const handleChange = async (event) => {
    const file = event.target.files[0];
    const result = await imageUploadHandler(file);
    helpers.setValue(result);
  };

  const imageUploadHandler = async (selectedImage) => {
    setLoading(true);
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            key: "0d180d1e52b07c1ca4a646bf3e792af2",
          },
        }
      );

      const imageUrl = response.data.data.display_url;
      setLoading(false);
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("image upload failed");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col my-2">
      {loading && <Loader forProcess={true} />}
      <label htmlFor={name} className="text-[14px] font-medium pb-2">
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={handleChange}
        {...rest}
        className="bg-input px-2 text-[14px] py-2 rounded-[6px] outline-none active:border-[1px] focus:border-[1px] border-brand"
      />
      <div className="text-red text-[13px] my-[2px]">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};
export default FileInput;
