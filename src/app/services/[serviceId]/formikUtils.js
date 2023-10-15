import * as Yup from "yup";

const InitialValues = {
  service: "",
  validPhoneNumber: "",
  date: "",
  time: "",
};

const validationSchema = {
  validPhoneNumber: Yup.string().required("Required"),
  date: Yup.string().required("Required"),
  time: Yup.string().required("Required"),
};

export { InitialValues, validationSchema };
