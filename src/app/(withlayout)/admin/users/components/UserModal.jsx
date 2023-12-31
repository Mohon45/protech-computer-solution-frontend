"use client";

import Input from "@/components/UIComponets/Input";
import { Modal } from "@/components/UIComponets/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { InitialValues, validationSchema } from "./formikUtils";
import { Icon } from "@iconify/react";
import Image from "next/image";
import avatar from "../../../../../assets/avatar.png";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import axios from "axios";
import {
  useSignUpMutation,
  useUserProfileUpdateMutation,
} from "@/redux/api/authApi";

const Flex = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
  );
};

const UserBody = (props) => {
  const [initialVals, setInitialVals] = useState(InitialValues);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [signUp, signUpResult] = useSignUpMutation();
  const [userProfileUpdate, updateResult] = useUserProfileUpdateMutation();
  const formikRef = useRef();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (props.viewOrEdit === "edit") {
      const tempInitialVals = {
        name: props?.selectedUser[0]?.name,
        email: props?.selectedUser[0]?.email,
        password: props?.selectedUser[0]?.password,
        phone: props?.selectedUser[0]?.phone,
        address: props?.selectedUser[0]?.address,
        image: props?.selectedUser[0]?.image,
      };
      setInitialVals(tempInitialVals);
    }
  }, [props.viewOrEdit]);

  const submitHandler = async (values, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);
    try {
      if (props.viewOrEdit === "edit") {
        const data = {
          id: props.selectedUser[0]?._id,
          body: values,
        };
        const result = await userProfileUpdate(data);
        if (result.data?.data) {
          toast.success("User Update Success!");
          setSubmitting(false);
          setLoading(true);
          props?.setShowUserModal(false);
        }
      } else {
        const result = await signUp(values);
        if (result.data?.data) {
          toast.success("New User Created Success");
          setSubmitting(false);
          setLoading(false);
          props?.setShowUserModal(false);
        }
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      setLoading(false);
    }
  };

  const handleImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const imageUploadHandler = async (e) => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("image upload failed");
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#E4F2EB] px-5 pb-5">
      {loading && <Loader forProcess={true} />}
      <Formik
        initialValues={initialVals}
        validationSchema={Yup.object(validationSchema)}
        onSubmit={submitHandler}
        innerRef={formikRef}
        enableReinitialize={true}
      >
        {({ isSubmitting, values }) => (
          <Form>
            {props.viewOrEdit === "edit" && (
              <div className="w-[30%] mx-auto mb-2">
                <Image
                  alt="image "
                  src={
                    uploadImageUrl
                      ? uploadImageUrl
                      : props?.selectedUser[0]?.image
                      ? props?.selectedUser[0]?.image
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
            )}

            <Flex>
              <Input label="Name" name="name" type="text" placeholder="name" />
              <Input
                label="Email"
                name="email"
                type="text"
                placeholder="email"
              />
            </Flex>
            <Flex>
              {props.viewOrEdit !== "edit" ? (
                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="user password"
                />
              ) : (
                <div></div>
              )}

              <Input
                label="Phone Number"
                name="phone"
                type="text"
                placeholder="phone number"
              />
            </Flex>
            <Flex>
              <Input
                label="Address"
                name="address"
                type="text"
                placeholder="address"
              />
            </Flex>
            <div className="flex">
              <button
                type="submit"
                className="my-0 mx-0 bg-brand hover:bg-brand hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] w-[130px] py-2 px-3 mt-2 rounded-md flex justify-center items-center"
              >
                {isSubmitting ? (
                  <Icon icon="eos-icons:loading" className="text-[24px]" />
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const UserModal = (props) => {
  return (
    <div>
      {props.showUserModal && (
        <Modal
          title={`${
            props.viewOrEdit === "edit" ? `Update a User` : `Create a New User`
          }`}
          subtitle={`Please enter the following information to ${
            props.viewOrEdit === "edit" ? `update user` : `create user`
          }`}
          setModal={props?.setShowUserModal}
          body={<UserBody {...props} />}
        />
      )}
      <h1>MOda</h1>
    </div>
  );
};

export default UserModal;
