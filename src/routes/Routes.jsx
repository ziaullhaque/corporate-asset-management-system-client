import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <div>Oops! An error occurred.</div>,
    children: [
      {
        path: "/",
        element: <div></div>,
      },
    ],
  },
]);
