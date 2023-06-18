import React from 'react';
import Box from '@mui/material/Box';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Navbar from './Pages/Navbar';
import HomePage from './Pages/Home';
import AddPage from './Pages/Add';
import EditPage from './Pages/Edit';
import ProfilePage from './Pages/Profile/Profile';
import SettingPage from './Pages/Setting';
import ViewPage from './Pages/View';
import ReviewsPage from './Pages/Category/Reviews';
import RecipesPage from './Pages/Category/Recipes';
import JobsPage from './Pages/Category/Jobs';
import PromotePage from './Pages/Category/Promote';
import AskPage from './Pages/Category/Ask';


function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/Reviews",
      element: <ReviewsPage />,
    },
    {
      path: "/Recipes",
      element: <RecipesPage />,
    },
    {
      path: "/Jobs",
      element: <JobsPage />,
    },
    {
      path: "/Promote",
      element: <PromotePage />,
    },
    {
      path: "/Ask",
      element: <AskPage />,
    },
    {
      path: "/add",
      element: <AddPage />,
    },
    {
      path: "/edit/:editID",
      element: <EditPage />,
      loader: async ({ params }) => {
        localStorage.setItem("postID", `${params.editID}`);
        return null
      }
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
      loader: async ({ params }) => {
        localStorage.setItem("postID", `${params.viewID}`);
        return null
      }
    },
  ]);

  return (
    <div>
      <Navbar />
      <Box sx={{marginBottom: 8}}></Box>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default AppRouter;
