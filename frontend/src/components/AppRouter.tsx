import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from './App/Navbar';
import HomePage from './App/Home';
import AddPage from './App/Add';
import EditPage from './App/Edit';
import ProfilePage from './App/Profile';
import SettingPage from './App/Setting';
import ViewPage from './App/View';


function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/add",
      element: <AddPage />,
    },
    {
      path: "/edit/:editID",
      element: <EditPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/setting",
      element: <SettingPage />,
    },
    {
      path: "/view/:viewID",
      element: <ViewPage />,
    },
  ]);

  return (
    <div>
      <Navbar />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default AppRouter;
