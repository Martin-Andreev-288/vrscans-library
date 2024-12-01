import logo from "../assets/logo.png";
import logInImg from "../assets/sign-in-img.png";
import EmailInput from "../components/emailInput/EmailInput";

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex col justify-center">
      <div className="flex flex-col items-left justify-center border-b-4 border-b-black h-[8vh] w-[90vw]">
        <img className="w-[25rem]" src={logo} alt="CHAOSGROUP" />
      </div>
      <div className="">
        <img src={logInImg} alt="Chaosgroup Image" />
        <div>
          <h1 className="text-5xl font-bold text-black pb-6">Log In</h1>
          <EmailInput />
        </div>
      </div>
    </div>
  );
};

export default Login;
