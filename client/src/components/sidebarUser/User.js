import React from "react";
import "./User.css";

const User = (props) => {
  return (
    <div className="d-flex flex-row user-single-sidebr-outer-contnr">
      <div>
        <h6 className="m-0 p-2">{props.item.name}</h6>
      </div>
      <div>
        <p className="m-0 p-2">{props.item.online ? "~online" : ""}</p>
      </div>
    </div>
  );
};

export default User;
