import * as Yup from "yup";

const InitialValues = {
  name: "",
  email: "",
  password: "",
  phone: "",
  address: "",
  image: "",
};

const validationSchema = {
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
};

export { InitialValues, validationSchema };
