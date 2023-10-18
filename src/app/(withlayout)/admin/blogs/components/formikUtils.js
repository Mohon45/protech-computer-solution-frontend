import * as Yup from "yup";

const InitialValues = {
  title: "",
  image: "",
  description: "",
};

const validationSchema = {
  title: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
};

export { InitialValues, validationSchema };
