import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Signup/Signup";
import DashboardLayout from "../layouts/DashboardLayout";
import Profile from "../pages/Dashboard/Common/Profile";
import AddAsset from "../pages/Dashboard/HR/AddAsset";
import AllRequest from "../pages/Dashboard/HR/AllRequest";
import AssetList from "../pages/Dashboard/HR/AssetList";
import EmployeeList from "../pages/Dashboard/HR/EmployeeList";
import UpgradePackage from "../pages/Dashboard/HR/UpgradePackage";
import MyAsset from "../pages/Dashboard/Employee/MyAsset";
import MyTeam from "../pages/Dashboard/Employee/MyTeam";
import RequestAsset from "../pages/Dashboard/Employee/RequestAsset";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/Error/ErrorPage";
import Home from "../pages/Home/Home";
import About from "../pages/Home/Pages/About";
import Support from "../pages/Home/Pages/Support";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/support",
        element: <Support />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "add-asset",
        element: <AddAsset />,
      },
      {
        path: "all-requests",
        element: (
          <PrivateRoute>
            <AllRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "asset-list",
        element: (
          <PrivateRoute>
            <AssetList />
          </PrivateRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <PrivateRoute>
            <EmployeeList />
          </PrivateRoute>
        ),
      },
      {
        path: "upgrade-package",
        element: (
          <PrivateRoute>
            <UpgradePackage />
          </PrivateRoute>
        ),
      },
      {
        path: "my-assets",
        element: (
          <PrivateRoute>
            <MyAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "my-team",
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },
      {
        path: "request-asset",
        element: (
          <PrivateRoute>
            <RequestAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
