import { useState, useEffect } from "react";
import productImage from "/src/assets/profileImg.png";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ProfileSidebar() {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setProfileImage(storedImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem("profileImage", base64String);
        setProfileImage(base64String);
        toast.success("Profile image uploaded successfully!", {
          autoClose: 2000
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-8 flex flex-col items-center">
        {/* Image */}
        <img
          src={profileImage || productImage}
          alt="Profile"
          className="w-full h-40 object-fill rounded-md mb-4"
        />
        <label className="inline-block text-xs bg-black font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-green focus:bg-green focus:outline-none disabled:cursor-not-allowed px-4 py-2 cursor-pointer">
          <span className="inline-block mr-3">
            <FaEdit />
          </span>
          Edit Profile Image
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
        <h2 className="mt-8 text-xl font-bold">Francesco Acerbi</h2>
        <h2 className="mt-2 text-gray-600">React Developer</h2>
        <h2 className="text-gray-600">seamann@gmail.com</h2>
      </div>
    </div>
  );
}
