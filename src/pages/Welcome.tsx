import welcomeImg from "../assets/welcome-page-img-2.png";

const Welcome: React.FC = () => {
    return (
        <div   className="flex flex-col items-center justify-center min-h-screen bg-cover bg-top"
        style={{ backgroundImage: `url(${welcomeImg})`, backgroundSize: "auto 100vh"}}>
            <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg items-center flex flex-col">
                <h1 className="text-4xl font-bold text-white pb-4">VRScans Materials Library</h1>
                <p className="text-lg text-white">An intuitive, React-powered application that dynamically fetches and displays VRScans materials via a pre-configured REST API.</p>
            </div>
        </div>
      );
};
  
export default Welcome;