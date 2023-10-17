"use client";

import Loader from "@/components/Loader";
import { useSubmitFeedbackMutation } from "@/redux/api/feedBackApi";
import { useState } from "react";
import { toast } from "react-toastify";

const FeedbackPage = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitFeedback, feedbakResult] = useSubmitFeedbackMutation();

  const submitFeedbackHandler = async () => {
    setLoading(true);
    try {
      const result = await submitFeedback({ description: description });
      if (result.data?.data) {
        toast.success("Your feedback was successfully submitted");
        setDescription("");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className="py-10 px-8">
      {loading && <Loader forProcess={true} />}
      <p className="w-[65%] mx-auto font-semibold text-center">
        If you have any Suggestion questions or would like an estimate before
        dropping by, we’re here to assist. Your satisfaction is our priority,
        and we’re committed to providing unparalleled service.
      </p>
      <div>
        <div className=" form-control w-[60%] mx-auto mt-12">
          <label className="label">
            <span className="label-text text-xl font-semibold">
              Your Feedback / Suggestions
            </span>
          </label>
          <textarea
            className="textarea  h-40 outline outline-1 outline-brand focus:border-none focus:outline-brand"
            placeholder="type your feedback here"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="mt-5 mx-0 bg-brand hover:bg-brand hover:bg-opacity-80 focus:bg-opacity-80 active:bg-opacity-80 text-white text-[16px] w-[180px] py-3 px-3 rounded-md flex justify-center items-center"
            onClick={submitFeedbackHandler}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
