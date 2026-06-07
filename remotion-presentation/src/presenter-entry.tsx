import { createRoot } from "react-dom/client";
import "./index.css";
import { PresenterPlayer } from "./presenter/PresenterPlayer";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Presenter root element not found.");
}

createRoot(root).render(<PresenterPlayer />);
