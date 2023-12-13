import { createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import React from "react"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
])
