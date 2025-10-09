import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  RouterProvider as Provider,
} from "react-router-dom";
import DynamicTable from "./DynamicTable.tsx";

const root = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/table",
    element: <DynamicTable />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider router={root} />
  </StrictMode>
);
