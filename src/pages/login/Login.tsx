import logo from "../../assets/logo.png";
import logInImg from "../../assets/sign-in-img.png";
import DefaultInput from "../../components/defaultInput/DefaultInput";
import Button from "../../components/button/Button";
import { Form, redirect, Link, NavLink, type ActionFunction } from "react-router";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { type ReduxStore } from "../../store/store";
import { loginUser } from "../../store/slices/userSlice";
import { AxiosResponse } from "axios";

export const action =
  (store: ReduxStore): ActionFunction =>
  async ({ request }): Promise<Response | null> => {
    const formData = await request.formData();

    const data = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    try {
      const response: AxiosResponse = await apiClient.post("/login", data);
      const username = response.data.user.username;
      const email = response.data.user.email;
      const id = response.data.user.id;
      const jwt = response.data.jwt;
      store.dispatch(
        loginUser({
          username,
          email,
          id,
          jwt
        })
      );
      toast.success("Login successful", { autoClose: 2000 });
      return redirect("/products");
    } catch (error) {
      console.log(error);
      toast.error("Login failed", { autoClose: 2000 });
      return null;
    }
  };

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <div className="flex flex-col items-left justify-center border-b-4 border-b-black h-[8vh] w-[90vw]">
        <Link to="/">
          <img className="w-[25rem]" src={logo} alt="Chaosgroup Logo" />
        </Link>
      </div>
      <div className="flex flex-row items-center h-[90vh]">
        <img className="h-[45vh] rounded-2xl mr-20" src={logInImg} alt="VR Scan Image" />
        <div className="w-[25vw] h-[45vh] flex flex-col items-center">
          <h2 className="text-4xl font-bold text-black pb-10">Log In</h2>
          <Form method="POST">
            <div className="pb-3 w-[25vw]">
              <DefaultInput type="text" name="email" placeholder="Email" />
            </div>
            <div className="pb-3 w-[25vw]">
              <DefaultInput type="password" name="password" placeholder="Password" />
            </div>
            <div className="mb-10">
              <Button type="logInButton">Log In</Button>
            </div>
          </Form>
          <p className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-black">
            Forgot Password?
          </p>
          <p className="text-base text-body-color dark:text-dark-6">
            <span className="pr-0.5 text-gray-400">Not a member yet?</span>
            <span className="text-primary hover:underline">
              <NavLink to="/signup">Sign Up</NavLink>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
