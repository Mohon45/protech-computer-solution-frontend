"use client";

import Input from "@/components/UIComponets/Input";
import { Modal } from "@/components/UIComponets/Modal";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { InitialValues, validationSchema } from "./formikUtils";
import { Icon } from "@iconify/react";

const Flex = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
  );
};

const UserBody = () => {
  const [initialVals, setInitialVals] = useState(InitialValues);
  const formikRef = useRef();

  const submitHandler = async (values, { setSubmitting }) => {
    try {
      console.log(values);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-[#E4F2EB] px-5 pb-5">
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
              <Input label="Name" name="name" type="text" placeholder="name" />
              <Input
                label="Email"
                name="email"
                type="text"
                placeholder="email"
              />
            </Flex>
            <Flex>
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="pser password"
              />
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
