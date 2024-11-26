import welcomeImg from "../assets/welcome-page-img.png";

const Welcome: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${welcomeImg})` }}>
            <h1 className="text-4xl font-bold text-white shadow-md">Welcome</h1>
            <p className="text-lg text-white">This is your welcome page!</p>
        </div>
      );
};
  
export default Welcome;