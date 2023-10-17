import { Field, ErrorMessage } from "formik";

const Select = ({ label, name, children }) => {
  return (
    <div className="flex flex-col my-2">
      <label htmlFor={name} className="text-[14px] font-medium pb-2">
        {label}
      </label>
      <Field
        name={name}
        as="select"
        className="bg-input text-[14px] px-2 py-[11px] rounded-[6px] outline-none active:border-[1px] focus:border-[1px] border-brand"
      >
        {children}
      </Field>
      <div className="text-red text-[13px] my-[2px]">
        <ErrorMessage name={name} />
      </div>
    </div>
  );
};

export default Select;
