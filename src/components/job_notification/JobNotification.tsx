import { Snackbar } from "@mui/material";
import React from "react";
import "./JobNotification.css";

function JobNotification() {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={true}
      autoHideDuration={6000}
      message="Job posting detected!"
    />
  );
}

export default JobNotification;
