import * as Yup from "yup";

const InitialValues = {
  name: "",
  email: "",
  phone: "",
  role: "",
  password: "",
  address: "",
};

const validationSchema = {
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  role: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
};

export { InitialValues, validationSchema };
