import { FaTimes } from "react-icons/fa";
import { type ProductCardProps } from "../productCard/ProductCard";

type ProductModalProps = {
  onClose: () => void;
  isFavorite: boolean;
};

export default function ProductModal({
  onClose,
  isFavorite,
  ...props
}: ProductModalProps & ProductCardProps) {
  const { name, thumb, fileName, material, manufacturer } = props;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Card */}
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl p-4 flex">
        {/* Left Section - Image */}
        <div className="relative w-1/2 flex items-end justify-center">
          <img
            src={thumb}
            alt="image not found"
            className="w-[80%] h-auto object-cover rounded-md mb-4"
          />
          {/* Buttons */}
          <button className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300">
            +
          </button>
          <button className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300">
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        {/* Right Section - Description */}
        <div className="relative w-1/2 pl-6 flex flex-col items-center justify-center">
          {/* Close Button */}
          <button
            className="absolute top-2 right-2 text-red-600 hover:text-red-800"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </button>

          {/* Product Details */}
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">{name}</h2>
            <p className="text-sm mb-2">
              <span className="font-bold">Material Type:</span> {material}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Colors:</span> Beige
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Tags:</span> V-Ray Next Recommended
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Manufacturer:</span> {manufacturer}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Industries:</span> Interior Design
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Filename:</span> {fileName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
