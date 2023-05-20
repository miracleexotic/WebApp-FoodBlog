import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from './App/Navbar';
import Home from './App/Home';

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
