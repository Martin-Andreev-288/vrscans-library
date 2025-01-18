import productImage from "/src/assets/profileImg.png";
import { FaEdit } from "react-icons/fa";

export default function ProfileSidebar() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8 flex flex-col items-center">
        {/* Image */}
        <img
          src={productImage}
          alt="image not found"
          className="w-full h-40 object-fill rounded-md mb-4"
        />
        <button className="inline-block text-xs bg-black font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-green focus:bg-green focus:outline-none disabled:cursor-not-allowed px-4 py-2">
          <span className="inline-block mr-3">
            <FaEdit />
          </span>
          Edit Profile Image
        </button>
        <h2 className="mt-8 text-xl font-bold">Francesco Acerbi</h2>
        <h2 className="mt-2 text-gray-600">React Developer</h2>
        <h2 className="text-gray-600">seamann@gmail.com</h2>
      </div>
    </div>
  );
}
