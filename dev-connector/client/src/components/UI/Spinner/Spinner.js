import React from "react";
import SpinnerGif from "../../../assets/img/spinner.gif";

const Spinner = props => {
  return (
    <div>
      <img
        src={SpinnerGif}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading.."
      />
    </div>
  );
};

export default Spinner;
