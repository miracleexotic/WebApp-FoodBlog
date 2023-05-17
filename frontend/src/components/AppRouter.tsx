import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from './Navbar';
import Home from './Home';

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
