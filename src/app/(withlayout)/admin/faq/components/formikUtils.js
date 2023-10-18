import * as Yup from "yup";

const InitialValues = {
  question: "",
  answar: "",
};

const validationSchema = {
  question: Yup.string().required("Required"),
  answar: Yup.string().required("Required"),
};

export { InitialValues, validationSchema };
