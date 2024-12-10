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

const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
    errorElement: <Error />
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <Error />
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
  return <RouterProvider router={router} />;
}
