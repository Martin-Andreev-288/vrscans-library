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
    children: [
      {
        path: "products",
        element: <Products />
      },
      {
        path: "favorites",
        element: <Favorites />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "collections",
        element: <Collections />
      }
    ]
  }
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
