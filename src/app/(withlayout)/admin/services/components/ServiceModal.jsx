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
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import Select from "@/components/UIComponets/Select";

const Flex = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
  );
};

const ServiceBody = (props) => {
  const [initialVals, setInitialVals] = useState(InitialValues);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [createService, createServiceResult] = useCreateServiceMutation();
  const [updateService, updateServiceResult] = useUpdateServiceMutation();
  const formikRef = useRef();
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (props.viewOrEdit === "edit") {
      console.log(props?.selectedService[0]);
      const tempInitialVals = {
        title: props?.selectedService[0]?.title,
        category: props?.selectedService[0]?.category,
        image: props?.selectedService[0]?.image,
        location: props?.selectedService[0]?.location,
        minPrice: props?.selectedService[0]?.minPrice,
        maxPrice: props?.selectedService[0]?.maxPrice,
        description: props?.selectedService[0]?.description,
      };
      setUploadImageUrl(props?.selectedService[0]?.image);
      setInitialVals(tempInitialVals);
    }
  }, [props.viewOrEdit]);

  const submitHandler = async (values, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);
    try {
      if (uploadImageUrl) {
        values.image = uploadImageUrl;
      }
      if (props.viewOrEdit === "edit") {
        const data = {
          id: props.selectedService[0]?._id,
          body: values,
        };
        const result = await updateService(data);
        if (result.data?.data) {
          toast.success("Service Update Success!");
          setSubmitting(false);
          setLoading(true);
          props?.setShowServiceModal(false);
        }
      } else {
        const result = await createService(values);
        if (result.data?.data) {
          toast.success("New Service Created Success");
          setSubmitting(false);
          setLoading(false);
          props?.setShowServiceModal(false);
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
    <div className="bg-[#E4F2EB] px-5 pb-5 overflow-y-scroll">
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
            <div className="w-[30%] mx-auto mb-2 mt-3">
              <Image
                alt="image "
                src={
                  uploadImageUrl !== ""
                    ? uploadImageUrl
                    : props?.selectedService[0]?.image
                    ? props?.selectedService[0]?.image
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

            <Flex>
              <Input
                label="Service Name"
                name="title"
                type="text"
                placeholder="service name"
              />
              <Select label="Category" name="category">
                <option value="repair">Repair</option>
                <option value="software">Software</option>
                <option value="data_recovary">Data Recovery</option>
                <option value="automation">Automation</option>
                <option value="others">Others</option>
              </Select>
            </Flex>
            <Flex>
              <Input
                label="Location"
                name="location"
                type="text"
                placeholder="location"
              />
              <Input
                label="Min Price"
                name="minPrice"
                type="number"
                placeholder="min price Range"
              />
            </Flex>
            <Flex>
              <Input
                label="Max Price"
                name="maxPrice"
                type="number"
                placeholder="max price Range"
              />
              <Input
                label="Desccription"
                name="description"
                type="text"
                placeholder="service description"
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

const ServiceModal = (props) => {
  return (
    <div>
      {props.showServiceModal && (
        <Modal
          title={`${
            props.viewOrEdit === "edit"
              ? `Update a Service`
              : `Create a New Service`
          }`}
          subtitle={`Please enter the following information to ${
            props.viewOrEdit === "edit" ? `update service` : `create service`
          }`}
          setModal={props?.setShowServiceModal}
          body={<ServiceBody {...props} />}
        />
      )}
      <h1>MOda</h1>
    </div>
  );
};

export default ServiceModal;
