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
  useSignUpMutation,
  useUserProfileUpdateMutation,
} from "@/redux/api/authApi";
import Select from "@/components/UIComponets/Select";

const Flex = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
  );
};

const FaqBody = (props) => {
  const [initialVals, setInitialVals] = useState(InitialValues);
  const [loading, setLoading] = useState(false);

  const [signUp, signUpResult] = useSignUpMutation();
  const [userProfileUpdate, updateFaqResult] = useUserProfileUpdateMutation();
  const formikRef = useRef();

  useEffect(() => {
    if (props.viewOrEdit === "edit") {
      setInitialVals(props?.selectedAdmin[0]);
    }
  }, [props.viewOrEdit]);

  const submitHandler = async (values, { setSubmitting }) => {
    setLoading(true);
    setSubmitting(true);
    try {
      if (props.viewOrEdit === "edit") {
        const data = {
          id: props.selectedAdmin[0]?._id,
          body: values,
        };
        const result = await userProfileUpdate(data);
        if (result.data?.data) {
          toast.success("Admin Update Success!");
          setSubmitting(false);
          setLoading(true);
          props?.setShowAdminModal(false);
        }
      } else {
        const result = await signUp(values);
        if (result.data?.data) {
          toast.success("New Admin Created Success");
          setSubmitting(false);
          setLoading(false);
          props?.setShowAdminModal(false);
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
            <Input
              label="Name"
              name="name"
              type="text"
              placeholder="admin name"
            />
            <Input
              label="Email"
              name="email"
              type="text"
              placeholder="admin email"
            />
            <Input
              label="Phone Number"
              name="phone"
              type="text"
              placeholder="admin phone number"
            />
            <Select label="Role" name="role">
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </Select>
            {props.viewOrEdit !== "edit" && (
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="admin password"
              />
            )}

            <Input
              label="Adress"
              name="address"
              type="address"
              placeholder="admin address"
            />

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

const AdminModal = (props) => {
  return (
    <div>
      {props.showAdminModal && (
        <Modal
          title={`${
            props.viewOrEdit === "edit"
              ? `Update a Admin`
              : `Create a New Admin`
          }`}
          subtitle={`Please enter the following information to ${
            props.viewOrEdit === "edit" ? `update user` : `create user`
          }`}
          setModal={props?.setShowAdminModal}
          body={<FaqBody {...props} />}
        />
      )}
    </div>
  );
};

export default AdminModal;
