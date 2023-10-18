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
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "@/redux/api/blogApi";
import FileInput from "@/components/UIComponets/FileInput";

const Flex = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">{children}</div>
  );
};

const BlogBody = (props) => {
  const [initialVals, setInitialVals] = useState(InitialValues);
  const [loading, setLoading] = useState(false);

  const [createBlog, createBlogResult] = useCreateBlogMutation();
  const [updateBlog, updateBlogResult] = useUpdateBlogMutation();
  const formikRef = useRef();

  useEffect(() => {
    if (props.viewOrEdit === "edit") {
      console.log(props?.selectedBlog[0]);
      const tempInitialVals = {
        _id: props?.selectedBlog[0]?._id,
        title: props?.selectedBlog[0]?.title,
        image: props?.selectedBlog[0]?.image,
        publishedDate: props?.selectedBlog[0]?.publishedDate,
        views: props?.selectedBlog[0]?.views,
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
          id: props.selectedBlog[0]?._id,
          body: values,
        };
        const result = await updateBlog(data);
        if (result.data?.data) {
          toast.success("Blog Update Success!");
          setSubmitting(false);
          setLoading(true);
          props?.setShowServiceModal(false);
        }
      } else {
        const result = await createBlog(values);
        if (result.data?.data) {
          toast.success("New Blog Created Success");
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
                label="Blog Title"
                name="title"
                type="text"
                placeholder="blog title"
              />
              <FileInput label="Blog Image" name="image" />
            </Flex>
            <Flex>
              <Input
                label="Desccription"
                name="description"
                type="text"
                placeholder="blog description"
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

const BlogModal = (props) => {
  return (
    <div>
      {props.showBlogModal && (
        <Modal
          title={`${
            props.viewOrEdit === "edit" ? `Update a Blog` : `Create a New Blog`
          }`}
          subtitle={`Please enter the following information to ${
            props.viewOrEdit === "edit" ? `update blog` : `create blog`
          }`}
          setModal={props?.setShowBlogModal}
          body={<BlogBody {...props} />}
        />
      )}
    </div>
  );
};

export default BlogModal;
