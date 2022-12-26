import { Button, Snackbar, SnackbarContent } from "@mui/material";
import React from "react";
import { notificationNeeded } from "../../content/injections/ShowNotification";
import "./JobNotification.css";

function JobNotification() {
  const [open, setOpen] = React.useState(true);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const saveJob = (e: React.MouseEvent) => {
    e.stopPropagation();
    chrome.runtime.sendMessage({
      message: "push_job",
      job_type: notificationNeeded(),
    });
    setTimeout(handleClose, 1000);
  };
  const saveButton = (
    <Button
      style={{ fontWeight: "bold" }}
      color="secondary"
      size="small"
      onClick={saveJob}
    >
      SAVE
    </Button>
  );
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={open}
      onClick={handleClose}
      TransitionProps={{
        onExited: (node) => {
          if (open == false) {
            document.getElementById("react-root")?.remove();
          }
        },
      }}
    >
      <SnackbarContent
        sx={{
          background:
            "linear-gradient(0deg, rgba(222,222,222,1) 0%, rgba(241,241,241,1) 39%, rgba(255,254,254,1) 100%)",
          color: "black",
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 2px 5px, rgba(0, 0, 0, 0.23) 0px 2px 5px;",
          fontSize: "1.5vh",
          width: "10vw",
          fontFamily: "Helvetica",
        }}
        action={saveButton}
        message={
          <span id="message-id2">
            <div>Job posting detected!</div>
          </span>
        }
      />
    </Snackbar>
  );
}

export default JobNotification;
