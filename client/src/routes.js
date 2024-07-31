import React, { useContext } from "react";
import { Navigate } from 'react-router-dom';

// Admin Imports
import MainDashboard from "views/admin/default";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";

// Auth Imports
import SignIn from "views/auth/SignIn";
import SignUp from "views/auth/SignUp";

// Icon Imports
import {
  MdHome,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

// Context
import AuthContext from "contexts/AuthContext";
import { path } from "variables/path";
import CaseDetail from "views/admin/case_detail";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
    layer: 1,
  },
  {
    name: "Cases Detail",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "cases/cases-:id/details",
    component: <CaseDetail />,
    layer: 2,
  },
  {
    name: "Cases",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "cases",
    component: <DataTables />,
    layer: 1,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
    layer: 1,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
    layer: 1,
  },
  {
    name: "Sign Up",
    layout: "/auth",
    path: "sign-up",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignUp />,
    layer: 1,
  },
];

export default routes;

// Private Route
export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user === null) {
    return <Navigate to={path.signIn} />;
  }

  return children;
};
