import { createRoot } from "react-dom/client";
import "./index.css";
import { PresenterPlayer } from "./presenter/PresenterPlayer";
import { NotificationStyleguide } from "./styleguide/NotificationStyleguide";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Presenter root element not found.");
}

createRoot(root).render(
  window.location.pathname === "/styleguide" ? (
    <NotificationStyleguide />
  ) : (
    <PresenterPlayer />
  ),
);
