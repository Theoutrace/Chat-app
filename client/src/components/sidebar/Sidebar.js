import React from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import User from "../sidebarUser/User";

const Sidebar = () => {
  const DUMMY_USERS = [
    {
      name: "Kapil",
      online: true,
    },
    {
      name: "Anil",
      online: false,
    },
    {
      name: "Sumit",
      online: true,
    },
  ];
  return (
    <div className="col-sm-3">
      <Card
        sx={{
          background: "grey",
          height: "100%",
          marginRight: "5px",
          borderRadius: "10px",
          paddingTop: "50px",
        }}
      >
        {DUMMY_USERS.map((user) => {
          return (
            <Box
              sx={{
                background: "White",
                height: "5%",
                marginBottom: "1px",
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
                paddingLeft: "10px",
                fontWeight: "500",
              }}
            >
              <User item={user} />
            </Box>
          );
        })}
      </Card>
    </div>
  );
};

export default Sidebar;
