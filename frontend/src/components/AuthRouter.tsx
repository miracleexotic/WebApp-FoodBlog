import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import SignInPage from './Auth/SignIn';
import SignUpPage from './Auth/SignUp';

function AuthRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignInPage />,
    },
    {
        path: "/register",
        element: <SignUpPage />
    }
  ]);

  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default AuthRouter;
