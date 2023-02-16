import React from "react";

const User = (props) => {
  return (
    <div className="d-flex ">
      <h6 className="m-0">{props.item.name}</h6>
    </div>
  );
};

export default User;
