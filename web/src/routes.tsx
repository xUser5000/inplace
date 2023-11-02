import React from "react";
import { createBrowserRouter } from "react-router-dom";

import { NotFound } from "./pages/404";
import { AboutPage } from "./pages/AboutPage";
import { Home } from "./pages/Home"
import { Layout } from "./pages/Layout";

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <NotFound />,
            },
            {
                path: "/about",
                element: <AboutPage />
            }
        ]
    },

]);
