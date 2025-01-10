import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Welcome,
  Login,
  SignUp,
  Products,
  Profile,
  Favorites,
  Collections,
  Error
} from "./pages";
import { ErrorElement } from "./components";
import { DataProvider } from "./context/DataContext";

import { action as registerAction } from "./pages/signUp/SignUp";
import { action as loginAction } from "./pages/login/Login";

import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <Error />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
    action: loginAction(store)
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />,
    action: registerAction
  },
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "products",
        element: <Products />,
        errorElement: <ErrorElement />
      },
      {
        path: "favorites",
        element: <Favorites />,
        errorElement: <ErrorElement />
      },
      {
        path: "profile",
        element: <Profile />,
        errorElement: <ErrorElement />
      },
      {
        path: "collections",
        element: <Collections />,
        errorElement: <ErrorElement />
      }
    ]
  }
]);

export default function App() {
  return (
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  );
}
