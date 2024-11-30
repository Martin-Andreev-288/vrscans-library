import welcomeImg from "../assets/welcome-page-img-2.png";
import Button from "../components/button/Button";

const Welcome: React.FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-top"
      style={{ backgroundImage: `url(${welcomeImg})`, backgroundSize: "auto 100vh" }}
    >
      <div className="bg-gray-600 bg-opacity-70 p-20 rounded-3xl items-center flex flex-col">
        <h1 className="text-5xl font-bold text-white pb-6">VRScans Materials Library</h1>
        <p className="text-lg text-white pb-40">
          An intuitive, React-powered application that dynamically fetches and displays VRScans
          materials via a pre-configured REST API.
        </p>
        <div className="items-center flex">
          <Button type="welcomeButton">Login / Signup</Button>
          <Button type="welcomeButton">Explore VRScans</Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
