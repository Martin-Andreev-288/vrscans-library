import { FaTimes } from "react-icons/fa";
import fontModalImage from "/src/assets/addCollectionImg.png";
import { ModalWrapper } from "../../components";
import useClickOutside from "../../hooks/useClickOutside";

type AddToCollectionModalProps = {
  onClose: () => void;
};

export default function CreateCollectionModal({ onClose }: AddToCollectionModalProps) {
  const modalRef = useClickOutside(onClose);

  return (
    <ModalWrapper>
      {/* Modal Window */}
      <div
        ref={modalRef}
        className="relative bg-white rounded-lg shadow-lg w-[90%] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl p-4 flex flex-col"
      >
        {/* Font Image */}
        <img
          src={fontModalImage}
          alt="Image not found"
          className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none"
        />

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Title */}
        <h2 className="text-xl font-semibold text-center mb-6">Create Collection</h2>

        {/* Collection Title Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Collection Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Create Collection Button */}
        <div className="flex flex-col items-center">
          <button className="mt-12 w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white">
            Create a Collection
          </button>
        </div>
      </div>
      ;
    </ModalWrapper>
  );
}
