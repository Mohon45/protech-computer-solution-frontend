import React, { useState } from "react";

const Accordian = ({ question, answer }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div
        className="main-heading cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <p> {show ? "➖" : "➕"} </p>
        <h3>{question}</h3>
      </div>
      {show && <p className="answers text-justify"> {answer} </p>}
    </div>
  );
};

export default Accordian;
