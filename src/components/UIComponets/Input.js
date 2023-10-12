import React, { useState } from "react";
import { Field, ErrorMessage, useFormikContext, useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Input = ({ label, name, type, placeholder, disabled }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ name });
  const [date, setDate] = useState(new Date());
  if (type === "date") {
    return (
      <div className="flex flex-col my-2">
        <label htmlFor={name} className="text-[14px] font-medium pb-2">
          {label}
        </label>
        <DatePicker
          className="bg-input px-2 text-[14px] py-2 rounded-[6px] outline-none active:border-[1px] focus:border-[1px] border-brand w-[100%]"
          name={name}
          placeholderText={placeholder}
          disabled={disabled}
          selected={(field.value && new Date(field.value)) || null}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          onChange={(val) => {
            setDate(val);
            setFieldValue(name, val);
          }}
        />
        <div className="text-red text-[13px] my-[2px]">
          <ErrorMessage name={name} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col my-2">
        <label htmlFor={name} className="text-[14px] font-medium pb-2">
          {label}
        </label>
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className="bg-input px-2 text-[14px] py-2 rounded-[6px] outline-none active:border-[1px] focus:border-[1px] border-brand"
        />
        <div className="text-red text-[13px] my-[2px]">
          <ErrorMessage name={name} />
        </div>
      </div>
    );
  }
};

export default Input;
