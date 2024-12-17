import { useState } from "react";
import ProductModal from "../modals/ProductModal";
import AddToCollectionModal from "../modals/AddToCollectionModal";

type ProductCardProps = {
  name: string;
  thumb: string;
  material: string;
  manufacturer: string;
};

export default function ProductCard({ name, thumb, material, manufacturer }: ProductCardProps) {
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  const handleProductModalClose = () => {
    setProductModalOpen(false);
  };

  const handleCollectionModalClose = () => {
    setIsCollectionModalOpen(false);
  };

  return (
    <>
      <li
        className="relative flex flex-col h-[300px] w-full p-4 bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-transform duration-200"
        onClick={() => setProductModalOpen(true)}
      >
        {/* Buttons */}
        <button
          className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300"
          onClick={(event) => {
            event.stopPropagation();
            setIsCollectionModalOpen(true);
          }}
        >
          +
        </button>
        <button className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300">
          ♡
        </button>

        {/* Image */}
        <img
          src={thumb}
          alt="image not found"
          className="w-full h-40 object-fill rounded-md mb-4"
        />

        {/* Content */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <ul className="text-left text-sm">
            <li className="pl-2">{material}</li>
            <li className="pl-2">Manufacturer: {manufacturer}</li>
          </ul>
        </div>
      </li>

      {/* Modals */}
      {isProductModalOpen && !isCollectionModalOpen && (
        <ProductModal onClose={handleProductModalClose} isFavorite={false} />
      )}
      {isCollectionModalOpen && <AddToCollectionModal onClose={handleCollectionModalClose} />}
    </>
  );
}
