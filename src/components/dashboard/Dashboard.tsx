import React from "react";
import "./Dashboard.css";

import { Button } from "@mui/material";

function Dashboard() {
  const handleAuthClick = () => {
    chrome.runtime.sendMessage("open_google_auth");
  };

  const handleSignoutClick = () => {};
  return (
    <div className="Dashboard">
      <Button variant="contained">Add Job</Button>
      <Button id="authorize_button" onClick={handleAuthClick}>
        Authorize
      </Button>
      <Button id="signout_button" onClick={handleSignoutClick}>
        Sign Out
      </Button>
    </div>
  );
}

export default Dashboard;
