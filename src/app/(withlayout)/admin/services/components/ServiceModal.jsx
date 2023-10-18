"use client";

import Input from "@/components/UIComponets/Input";
import { Modal } from "@/components/UIComponets/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import { InitialValues, validationSchema } from "./formikUtils";
import { Icon } from "@iconify/react";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import {
  useCreateServiceMutation,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import Select from "@/components/UIComponets/Select";
import FileInput from "@/components/UIComponets/FileInput";

const Flex = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
  );
};

const ServiceBody = (props) => {
  const [initialVals, setInitialVals] = useState(InitialValues);
  const [loading, setLoading] = useState(false);

  const [createService, createServiceResult] = useCreateServiceMutation();
  const [updateService, updateServiceResult] = useUpdateServiceMutation();
  const formikRef = useRef();

  useEffect(() => {
    if (props.viewOrEdit === "edit") {
      const tempInitialVals = {
        title: props?.selectedService[0]?.title,
        category: props?.selectedService[0]?.category,
        image: props?.selectedService[0]?.image,
        location: props?.selectedService[0]?.location,
        minPrice: props?.selectedService[0]?.minPrice,
        maxPrice: props?.selectedService[0]?.maxPrice,
        description: props?.selectedService[0]?.description,
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
            <Flex>
              <Input
                label="Service Name"
                name="title"
                type="text"
                placeholder="service name"
              />
              <FileInput label="Service Image" name="image" />
            </Flex>
            <Flex>
              <Select label="Category" name="category">
                <option value="repair">Repair</option>
                <option value="software">Software</option>
                <option value="data_recovary">Data Recovery</option>
                <option value="automation">Automation</option>
                <option value="others">Others</option>
              </Select>
              <Input
                label="Location"
                name="location"
                type="text"
                placeholder="location"
              />
            </Flex>
            <Flex>
              <Input
                label="Min Price"
                name="minPrice"
                type="number"
                placeholder="min price Range"
              />
              <Input
                label="Max Price"
                name="maxPrice"
                type="number"
                placeholder="max price Range"
              />
            </Flex>
            <Flex>
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
    </div>
  );
};

export default ServiceModal;
