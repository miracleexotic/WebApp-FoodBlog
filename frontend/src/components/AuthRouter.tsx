import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';

function AuthRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
    },
    {
        path: "/register",
        element: <SignUp />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default AuthRouter;
