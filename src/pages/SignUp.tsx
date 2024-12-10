import logo from "../assets/logo.png";
import logInImg from "../assets/sign-in-img.png";
import DefaultInput from "../components/defaultInput/DefaultInput";
import Button from "../components/button/Button";

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col justify-start items-center">
      <div className="flex flex-col items-left justify-center border-b-4 border-b-black h-[8vh] w-[90vw]">
        <img className="w-[25rem]" src={logo} alt="Chaosgroup Logo" />
      </div>
      <div className="flex flex-row items-center h-[90vh]">
        <img className="h-[45vh] rounded-2xl mr-20" src={logInImg} alt="VR Scan Image" />
        <div className="w-[25vw] h-[45vh] flex flex-col items-center">
          <h2 className="text-4xl font-bold text-black pb-5">Sign Up</h2>
          <form>
            <div className="pb-3 w-[25vw]">
              <DefaultInput placeholder="Username" />
            </div>
            <div className="pb-3 w-[25vw]">
              <DefaultInput placeholder="Email" />
            </div>
            <div className="pb-3 w-[25vw]">
              <DefaultInput placeholder="Password" />
            </div>
            <div className="pb-3 w-[25vw]">
              <DefaultInput placeholder="Confirm Password" />
            </div>
            <div className="mb-5">
              <Button type="logInButton">Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
