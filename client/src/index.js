import React from "react";
import "./index.css";
import routes from "./components/Routes";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { UserProvider } from "./components/Adult";

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <UserProvider>
            <RouterProvider router={routes} />
        </UserProvider>
    </React.StrictMode>
);