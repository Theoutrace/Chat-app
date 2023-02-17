import React from "react";
import Card from "@mui/material/Card";
import { Box } from "@mui/system";
import User from "../sidebarUser/User";
import userIcon from "./images/user.png";

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
    <Card
      sx={{
        background: "#A1A5A63B",
        height: "100%",
        marginRight: "5px",
        borderRadius: "10px",
        flexGrow: 1,
        display: { xs: "none", md: "block" },
        position: "relative",
        paddingTop: "5%",
      }}
      className="col-sm-3"
    >
      <Box
        sx={{
          position: "absolute",
          top: "0",
          zIndex: "3",
          width: "100%",
          height: "60px",
          marginBottom: "5px",
          boxShadow: "rgba(0, 0, 0, 0.20) 0px 2px 15px",
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
        }}
        className="bg-white"
      >
        <img src={userIcon} alt="useImage" width="15%" className="mx-2 p-1" />
      </Box>
      {DUMMY_USERS.map((user) => {
        return (
          <Box
            sx={{
              background: "White",
              height: "7%",
              marginBottom: "1px",
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              paddingLeft: "8px",
              fontWeight: "500",
            }}
          >
            <img src={userIcon} alt="" className="d-flex p-1" width="15%" />
            <User item={user} />
          </Box>
        );
      })}
    </Card>
  );
};

export default Sidebar;
