import React from "react";
import { createRoot } from "react-dom/client";
import JobNotification from "../../components/job_notification/JobNotification";

function showNotification() {
  if (typeof window !== "undefined" && !document.getElementById("react-root")) {
    const doc = document.querySelector("html");
    const body = document.querySelector("body") as HTMLElement;
    body.style.position = "relative";
    body.style.zIndex = "0";
    const app = document.createElement("div");
    app.id = "react-root";
    if (doc) {
      doc.prepend(app);
    }
    const container = document.getElementById("react-root") as HTMLElement;
    const root = createRoot(container);
    root.render(<JobNotification />); // Render react component
  }
}

function notificationNeeded(): boolean {
  // workday detection logic
  if (document.querySelector('[data-automation-id="jobPostingDescription"]')) {
    console.log("here");
    return true;
  }
  return false;
}

function checkForNotifications() {
  if (notificationNeeded()) {
    showNotification();
    chrome.runtime.sendMessage("increment_badge");
  } else {
    var el = document.getElementById("react-root")?.children[0] as HTMLElement;
    el.click(); // click inside container
  }
}

export function startNotifications() {
  checkForNotifications();
}
