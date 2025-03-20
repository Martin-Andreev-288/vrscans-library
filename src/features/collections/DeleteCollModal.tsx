import { useDispatch } from "react-redux";
import { removeCollection } from "../../store/slices/collectionsSlice";
import { ModalWrapper } from "../../components";
import { MdClose } from "react-icons/md";

type DeleteCollModalProps = {
  onClose: () => void;
  title: string;
};

function DeleteCollModal({ onClose, title }: DeleteCollModalProps) {
  const dispatch = useDispatch();

  return (
    <ModalWrapper>
      <div className="relative bg-white rounded-lg p-6 mx-4 w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
        >
          <MdClose className="w-6 h-6 text-gray-500 hover:text-gray-700" />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          {/* Warning Icon */}
          <div className="mx-auto mb-4 text-red-500">
            <svg
              className="w-12 h-12 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-gray-800">Delete Collection</h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete collection "{title}"? This action cannot be undone.
          </p>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                dispatch(removeCollection(title));
                onClose();
              }}
              className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default DeleteCollModal;
