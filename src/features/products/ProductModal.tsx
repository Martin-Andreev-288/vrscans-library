import { FaTimes } from "react-icons/fa";
import { type ProductCardProps } from "./ProductCard";
import { ModalWrapper } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import useClickOutside from "../../hooks/useClickOutside";

type ProductModalProps = {
  onClose: () => void;
  isFavorite: boolean;
  handleToggleFavorite: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleOpenCollectionModal: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ProductModal({
  onClose,
  isFavorite,
  handleToggleFavorite,
  handleOpenCollectionModal,
  ...props
}: ProductModalProps & ProductCardProps) {
  const { name, thumb, fileName, material, manufacturer, colors, tags, industries } = props;

  const user = useSelector((state: RootState) => state.userState.user);
  const modalRef = useClickOutside(onClose);

  return (
    <ModalWrapper>
      {/* Modal Card */}
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-[90%] max-w-4xl p-4 flex">
        {/* Left Section - Image */}
        <div className="relative w-1/2 flex items-end justify-center bg-gray-100 p-2 rounded-lg border border-gray-100 mb-4 group">
          <img
            src={thumb}
            alt="image not found"
            className="w-[80%] h-auto object-cover rounded-md mb-4 transition-transform duration-300 group-hover:scale-95"
          />
          {/* Buttons */}
          {user && (
            <>
              <button
                className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300"
                onClick={handleOpenCollectionModal}
              >
                +
              </button>
              <button
                className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300"
                onClick={handleToggleFavorite}
              >
                {isFavorite ? "♥" : "♡"}
              </button>
            </>
          )}
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
              <span className="font-bold">Colors:</span> {colors}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Tags:</span> {tags}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Manufacturer:</span> {manufacturer}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Industries:</span> {industries}
            </p>
            <p className="text-sm mb-2">
              <span className="font-bold">Filename:</span> {fileName}
            </p>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
