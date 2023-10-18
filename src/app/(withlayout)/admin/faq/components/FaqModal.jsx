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
import FileInput from "@/components/UIComponets/FileInput";
import { useCreateFaqMutation, useUpdateFaqMutation } from "@/redux/api/faqApi";

const Flex = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
  );
};

const FaqBody = (props) => {
  const [initialVals, setInitialVals] = useState(InitialValues);
  const [loading, setLoading] = useState(false);

  const [createFaq, createFaqResult] = useCreateFaqMutation();
  const [updateFaq, updateFaqResult] = useUpdateFaqMutation();
  const formikRef = useRef();

  useEffect(() => {
    if (props.viewOrEdit === "edit") {
      console.log(props?.selectedFaq[0]);
      const tempInitialVals = {
        _id: props?.selectedFaq[0]?._id,
        question: props?.selectedFaq[0]?.question,
        answar: props?.selectedFaq[0]?.answar,
        publishedDate: props?.selectedFaq[0]?.publishedDate,
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
          id: props.selectedFaq[0]?._id,
          body: values,
        };
        const result = await updateFaq(data);
        if (result.data?.data) {
          toast.success("Faq Update Success!");
          setSubmitting(false);
          setLoading(true);
          props?.setShowFaqModal(false);
        }
      } else {
        const result = await createFaq(values);
        if (result.data?.data) {
          toast.success("New Faq Created Success");
          setSubmitting(false);
          setLoading(false);
          props?.setShowFaqModal(false);
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
              label="FAQ Question"
              name="question"
              type="text"
              placeholder="faq question"
            />
            <Input
              label="FAQ Answare"
              name="answar"
              type="text"
              placeholder="faq answar"
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

const FaqModal = (props) => {
  return (
    <div>
      {props.showFaqModal && (
        <Modal
          title={`${
            props.viewOrEdit === "edit" ? `Update a Faq` : `Create a New Faq`
          }`}
          subtitle={`Please enter the following information to ${
            props.viewOrEdit === "edit" ? `update faq` : `create faq`
          }`}
          setModal={props?.setShowFaqModal}
          body={<FaqBody {...props} />}
        />
      )}
    </div>
  );
};

export default FaqModal;
