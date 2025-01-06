import { FaTimes } from "react-icons/fa";
import fontModalImage from "/src/assets/addCollectionImg.png";
import { createPortal } from "react-dom";

type AddToCollectionModalProps = {
  onClose: () => void;
};

export default function AddToCollectionModal({ onClose }: AddToCollectionModalProps) {
  const modalContent = (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
      {/* Modal Window */}
      <div className="relative bg-white max-h-192 2xl:h-1/2 w-[90%] max-w-md p-6 rounded-lg shadow-lg flex flex-col">
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
        <h2 className="text-xl font-semibold text-center mb-6">Add to Collection</h2>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search collections..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* List of Collections */}
        <ul className="space-y-4">
          <li className="flex justify-between items-center">
            <span className="text-gray-800">Concert Hall</span>
            <button className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save
            </button>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-800">Wood</span>
            <button className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save
            </button>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-800">Metal</span>
            <button className="px-4 py-1 bg-gray-300 text-gray-500 rounded-md cursor-not-allowed">
              Saved
            </button>
          </li>
          <li className="flex justify-between items-center">
            <span className="text-gray-800">Library</span>
            <button className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save
            </button>
          </li>
        </ul>

        {/* Create Collection Button */}
        <div className="flex flex-col items-center">
          <button className="mt-12 w-full px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600 hover:text-white">
            Create a Collection
          </button>

          {/* Done Button */}
          <button
            onClick={onClose}
            className="mt-32 w-1/3 px-4 py-2 bg-green-600 text-black border border-black font-bold rounded-md hover:bg-green-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("modal-root")!);
}
