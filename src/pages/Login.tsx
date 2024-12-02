import logo from "../assets/logo.png";
import logInImg from "../assets/sign-in-img.png";
import DefaultInput from "../components/defaultInput/DefaultInput";
import Button from "../components/button/Button";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <div className="flex flex-col items-left justify-center border-b-4 border-b-black h-[8vh] w-[90vw]">
        <img className="w-[25rem]" src={logo} alt="Chaosgroup Logo" />
      </div>
      <div className="flex flex-row items-center h-[90vh]">
        <img className="h-[45vh] rounded-2xl mr-20" src={logInImg} alt="VR Scan Image" />
        <div className="w-[25vw] h-[45vh] flex flex-col items-center">
          <h2 className="text-4xl font-bold text-black pb-10">Log In</h2>
          <form>
            <div className="pb-3 w-[25vw]">
              <DefaultInput placeholder="Email" />
            </div>
            <div className="pb-3 w-[25vw]">
              <DefaultInput placeholder="Password" />
            </div>
            <div className="mb-10">
              <Button type="logInButton">Log In</Button>
            </div>
          </form>
          <p className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-black">
            Forgot Password?
          </p>
          <p className="text-base text-body-color dark:text-dark-6">
            <span className="pr-0.5 text-gray-400">Not a member yet?</span>
            <span className="text-primary hover:underline"> Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
