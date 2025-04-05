import { useDispatch } from "react-redux";
import { removeItemFromCollection } from "../../../store/slices/collectionsSlice";
import { ModalWrapper } from "../../../components";
import { MdClose } from "react-icons/md";

type DeletePrCardModalProps = {
  onClose: () => void;
  collectionTitle: string;
  itemName: string;
  id: number;
};

function DeletePrCardModal({ onClose, collectionTitle, itemName, id }: DeletePrCardModalProps) {
  const dispatch = useDispatch();

  const handleRemoveItem = (
    event: React.MouseEvent<HTMLButtonElement>,
    collTitle: string,
    itemId: number
  ) => {
    event.stopPropagation();
    dispatch(
      removeItemFromCollection({
        collectionTitle: collTitle,
        itemId
      })
    );
  };
  return (
    <ModalWrapper>
      <div className="relative bg-white rounded-xl p-8 mx-4 w-full max-w-[448px]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 hover:bg-gray-50 rounded-full transition-colors"
        >
          <MdClose className="w-6 h-6 text-gray-400 hover:text-gray-600" />
        </button>

        {/* Modal Content */}
        <div className="text-center space-y-6">
          {/* Destructive Action Icon */}
          <div className="mx-auto text-purple-500">
            <svg
              className="w-14 h-14 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">Remove "{itemName}"</h3>
            <p className="text-gray-500 px-4">
              This product will be permanently removed from collection "{collectionTitle}".
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={(e) => handleRemoveItem(e, collectionTitle, id)}
              className="px-5 py-2.5 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default DeletePrCardModal;
