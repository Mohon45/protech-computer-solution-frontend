import * as Yup from "yup";

const InitialValues = {
  title: "",
  category: "",
  image: "",
  location: "",
  minPrice: "",
  maxPrice: "",
  description: "",
};

const validationSchema = {
  title: Yup.string().required("Required"),
  category: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
  minPrice: Yup.number().required("Required"),
  maxPrice: Yup.number().required("Required"),
};

export { InitialValues, validationSchema };
