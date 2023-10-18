"use client";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import avatar from "../../../../assets/avatar.png";
import Input from "@/components/UIComponets/Input";
import { useEffect, useRef, useState } from "react";
import { InitialValues, validationSchema } from "./formikUtils";
import axios from "axios";
import { useUserProfileUpdateMutation } from "@/redux/api/authApi";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";

const Flex = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
  );
};

const AdminProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [initialVals, setInitialVals] = useState(InitialValues);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [edit, setEdit] = useState(true);
  const [userProfileUpdate, updateResult] = useUserProfileUpdateMutation();
  const formikRef = useRef();
  const fileInputRef = useRef(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const tempUser = {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      image: user?.image,
    };
    setInitialVals(tempUser);
  }, [user]);

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const imageUploadHandler = async (e) => {
    const selectedImage = e.target.files[0];
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
      setUploadImageUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const submitHandler = async (values, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);
    try {
      values.image = uploadImageUrl;
      const data = {
        id: user._id,
        body: values,
      };
      const result = await userProfileUpdate(data);
      if (result.data?.data) {
        setLoading(false);
        toast.success("profile updated");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-gradient-green  to-gradient-blue py-10">
      {loading && <Loader forProcess={true} />}
      <div className="w-[80%] mx-auto shadow-xl p-8 rounded-md outline outline-1 outline-brand">
        <div className="flex justify-between items-center">
          <h1 className="md:text-3xl font-semibold">My Profile</h1>
          <div
            className="flex items-center text-brand text-xl font-bold cursor-pointer"
            onClick={() => setEdit(false)}
          >
            <p className="mr-2">Edit</p>
            <Icon icon="bxs:edit" />
          </div>
        </div>
        <div className="my-5 md:w-[80%] mx-auto flex flex-col md:flex-row items-center">
          <div className="w-[30%]">
            <Image
              alt="image "
              src={
                user?.image
                  ? user?.image
                  : uploadImageUrl
                  ? uploadImageUrl
                  : avatar
              }
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full mx-auto"
            />
            <div className=" flex">
              <input
                ref={fileInputRef}
                type="file"
                className="w-[30px] mx-auto hidden"
                onChange={imageUploadHandler}
              />
              <Icon
                icon="ep:upload-filled"
                width={30}
                className="mx-auto cursor-pointer "
                onClick={() => handleImageUpload()}
              />
            </div>
          </div>
          <div className="w-[70%]">
            {/* label, name, type, placeholder, disabled */}
            <Formik
              initialValues={initialVals}
              validationSchema={Yup.object(validationSchema)}
              onSubmit={submitHandler}
              innerRef={formikRef}
              enableReinitialize={true}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <Flex>
                    <Input
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="name"
                      disabled={edit}
                    />
                    <Input
                      label="Email"
                      name="email"
                      type="text"
                      placeholder="email"
                      disabled={edit}
                    />
                  </Flex>
                  <Flex>
                    <Input
                      label="Phone Number"
                      name="phone"
                      type="text"
                      placeholder="phone number"
                      disabled={edit}
                    />
                    <Input
                      label="Address"
                      name="address"
                      type="text"
                      placeholder="address"
                      disabled={edit}
                    />
                  </Flex>
                  <div className="flex">
                    <button
                      type="submit"
                      disabled={edit}
                      className="my-0 mx-0 bg-brand hover:bg-brand hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] w-[130px] py-2 px-3 mt-2 rounded-md flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <Icon
                          icon="eos-icons:loading"
                          className="text-[24px]"
                        />
                      ) : (
                        "Save Change"
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
  );
};

export default AdminProfilePage;
