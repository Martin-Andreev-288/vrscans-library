import logo from "../../assets/logo.png";
import logInImg from "../../assets/sign-in-img.png";
import DefaultInput from "../../components/defaultInput/DefaultInput";
import Button from "../../components/button/Button";
import { type ActionFunction, Form, Link, NavLink, redirect } from "react-router-dom";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export const action: ActionFunction = async ({ request }): Promise<Response | null> => {
  const formData = await request.formData();
  // const data = Object.fromEntries(formData);
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password")
  };
  try {
    await apiClient.post("/register", data);

    toast.success("Successful registration", { autoClose: 2000 });

    return redirect("/login");
  } catch (error) {
    console.log(error);

    if (error instanceof AxiosError && error.response?.status === 400) {
      const errorMsg = error.response.data?.error?.message || "Email already exists";
      toast.error(errorMsg);
      return null;
    }

    toast.error("Registration failed", { autoClose: 2000 });
    return null;
  }
};

export default function SignUp() {
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
          <h2 className="text-4xl font-bold text-black pb-5">Sign Up</h2>
          <Form method="post">
            <div className="pb-3 w-[25vw]">
              <DefaultInput type="text" name="username" placeholder="Username" />
            </div>
            <div className="pb-3 w-[25vw]">
              <DefaultInput type="email" name="email" placeholder="Email" />
            </div>
            <div className="pb-3 w-[25vw]">
              <DefaultInput type="password" name="password" placeholder="Password" />
            </div>
            <div className="mb-5 w-[25vw] h-[45vh] flex flex-col items-center">
              <Button type="logInButton">
                <Link to="/login">Sign Up</Link>
              </Button>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5 text-gray-400">Already a member?</span>
                <span className="text-primary hover:underline">
                  <NavLink to="/login">Login</NavLink>
                </span>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
