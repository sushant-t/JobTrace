import React from "react";
import "./Dashboard.css";

import { Button } from "@mui/material";
import { getWorkdayJobInfo } from "../../content/sites/WorkdayExtractor";

function Dashboard() {
  const handleAuthClick = () => {
    chrome.runtime.sendMessage("open_google_auth");
  };

  const handleSaveJobClick = () => {
    getWorkdayJobInfo().then((data) => {
      console.log(data);
    });
  };

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
