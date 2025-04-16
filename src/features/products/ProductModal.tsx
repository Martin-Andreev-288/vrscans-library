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
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl backdrop-blur-sm w-[90%] max-w-4xl p-8 flex border border-gray-100"
      >
        {/* Left Section - Image */}
        <div className="relative w-1/2 flex items-end justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl border border-gray-200 group">
          <img
            src={thumb}
            alt="Product preview"
            className="w-[85%] h-auto object-cover rounded-lg mb-4 transition-all duration-300 group-hover:scale-95 group-hover:shadow-lg"
          />
          {/* Buttons */}
          {user && (
            <div className="absolute top-3 left-3 right-3 flex justify-between">
              <button
                className="bg-white/90 backdrop-blur-sm text-gray-600 rounded-full p-2.5 shadow-sm hover:bg-white transition-all hover:scale-105 hover:shadow-md"
                onClick={handleOpenCollectionModal}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <button
                className={`${
                  isFavorite ? "text-red-500" : "text-gray-400"
                } bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-sm hover:bg-white transition-all hover:scale-105 hover:shadow-md`}
                onClick={handleToggleFavorite}
              >
                <svg
                  className="w-5 h-5"
                  fill={isFavorite ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Right Section - Description */}
        <div className="relative w-1/2 pl-8 flex flex-col">
          <button
            className="absolute top-0 right-0 text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-50 rounded-full"
            onClick={onClose}
          >
            <FaTimes className="w-5 h-5" />
          </button>

          <div className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight text-center">{name}</h2>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-3 gap-3">
                <dt className="col-span-1 font-medium text-gray-500">Material</dt>
                <dd className="col-span-2 bg-gray-50 px-3 py-1.5 rounded-md text-gray-600 border border-gray-100">
                  {material}
                </dd>

                <dt className="col-span-1 font-medium text-gray-500">Colors</dt>
                <dd className="col-span-2 bg-gray-50 px-3 py-1.5 rounded-md text-gray-600 border border-gray-100">
                  {colors}
                </dd>

                <dt className="col-span-1 font-medium text-gray-500">Tags</dt>
                <dd className="col-span-2 bg-gray-50 px-3 py-1.5 rounded-md text-gray-600 border border-gray-100">
                  {tags}
                </dd>

                <dt className="col-span-1 font-medium text-gray-500">Manufacturer</dt>
                <dd className="col-span-2 bg-gray-50 px-3 py-1.5 rounded-md text-gray-600 border border-gray-100">
                  {manufacturer}
                </dd>

                <dt className="col-span-1 font-medium text-gray-500">Industries</dt>
                <dd className="col-span-2 bg-gray-50 px-3 py-1.5 rounded-md text-gray-600 border border-gray-100">
                  {industries}
                </dd>

                <dt className="col-span-1 font-medium text-gray-500">Filename</dt>
                <dd className="col-span-2 bg-blue-50 px-3 py-1.5 rounded-md text-blue-800 border border-blue-100 font-mono text-xs">
                  {fileName}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}
