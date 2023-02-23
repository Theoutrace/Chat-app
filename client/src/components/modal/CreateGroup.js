import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Input } from "@mui/material";
import axios from "axios";
import "./CreateGroup.css";
import { useDispatch } from "react-redux";
import { ChatActions } from "../../Store/reducers/chat-reducer";

export default function CreateGroup(props) {
  const [groupName, setGroupName] = useState("");
  const dispatch = useDispatch();
  const grpNameOnchangeHandler = (e) => {
    setGroupName(e.target.value);
  };
  const createGroupSubmitHandler = async (e) => {
    e.preventDefault();
    const grpObj = {
      groupName,
    };
    await axios.post(`http://54.65.202.166:3000/groups/create`, grpObj, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
    });
    dispatch(ChatActions.fetchGroups());
    closeModalHandler();
  };
  const closeModalHandler = () => {
    props.modal.render(<></>);
  };
  return (
    <div className="modal-container-outer">
      <div className="mdl-inr-cnt-nr" onClick={closeModalHandler}></div>
      <Card
        component="form"
        onSubmit={createGroupSubmitHandler}
        sx={{ maxWidth: 345, position: "absolute", zIndex: "10", top: "25%" }}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Group
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginBottom: "20px" }}
          >
            Unleash the power of collaboration and organization for your
            personal or professional projects.... Explore the power of
            <span className="text-warning"> Dhindhora.</span>
          </Typography>
          <Input
            type="text"
            placeholder="Group Name"
            value={groupName}
            onChange={grpNameOnchangeHandler}
          />
          <Button type="submit">+ Create</Button>
        </CardContent>
      </Card>
    </div>
  );
}
