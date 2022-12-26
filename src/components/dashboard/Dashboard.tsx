import React from "react";
import "./Dashboard.css";

import { Button } from "@mui/material";
import { getJobInfo } from "../../content/actions/CollectJobInfo";
import { notificationNeeded } from "../../content/injections/ShowNotification";

function Dashboard() {
  const handleAuthClick = () => {
    chrome.runtime.sendMessage("open_google_auth");
  };

  const handleSaveJobClick = () => {};

  const handleAddJobClick = async () => {};
  return (
    <div className="Dashboard">
      <Button variant="contained" onClick={handleAddJobClick}>
        Add Job
      </Button>
      <Button id="authorize_button" onClick={handleAuthClick}>
        Authorize
      </Button>
      <Button id="save_job_button" onClick={handleSaveJobClick}>
        Save Job
      </Button>
    </div>
  );
}

export default Dashboard;
