"use client";
import { useState } from "react";
import "./Accordian.css";

const Accordian = ({ question, answer }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="main-heading">
        <p onClick={() => setShow(!show)}> {show ? "➖" : "➕"} </p>
        <h3>{question}</h3>
      </div>
      {show && <p className="answers"> {answer} </p>}
    </div>
  );
};

export default Accordian;
