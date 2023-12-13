import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import React from "react"
import Invitation from "./pages/Invitation"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/hi/:token",
    element: <Invitation />,
  },
])
