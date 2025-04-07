import { useState } from "react";
import ProductModal from "../../products/ProductModal";
import DeletePrCardModal from "./DeletePrCardModal";
import AddToCollectionModal from "../AddToCollectionModal";
import { useDispatch, useSelector } from "react-redux";
import { addToFavs, removeFromFavs } from "../../../store/slices/favoritesSlice";
import { type VRScan } from "../../../utils/types";
import { RootState } from "../../../store/store";
import { FiTrash } from "react-icons/fi";

export type CollectionItemCardProps = {
  name: string;
  item: VRScan;
  thumb: string;
  fileName: string;
  material: string;
  manufacturer: string;
  colors: string;
  tags: string;
  industries: string;
  collectionTitle: string;
};

export default function CollectionItemCard({
  name,
  item,
  thumb,
  fileName,
  material,
  manufacturer,
  colors,
  tags,
  industries,
  collectionTitle
}: CollectionItemCardProps) {
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);
  const [isPrCardDeleteModalOpen, setIsPrCardDeleteModalOpen] = useState(false);

  const user = useSelector((state: RootState) => state.userState.user);

  const dispatch = useDispatch();

  const favoritesList = useSelector((state: RootState) => state.favItems);

  const isFavorite = (itemId: number): boolean => {
    return favoritesList.some((favItem: VRScan) => favItem.id === itemId);
  };

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (isFavorite(item.id)) {
      dispatch(removeFromFavs(item.id));
    } else {
      dispatch(addToFavs(item));
    }
  };

  const handleProductModalClose = () => {
    setProductModalOpen(false);
  };

  const handleCollectionModalClose = () => {
    setIsCollectionModalOpen(false);
  };

  const handleDeletePrCardModalClose = () => {
    setIsPrCardDeleteModalOpen(false);
  };

  return (
    <>
      <li
        className="relative flex flex-col h-[380px] w-full bg-gradient-to-b from-blue-50/20 to-white border border-blue-100 rounded-xl shadow-lg cursor-pointer hover:shadow-xl hover:border-blue-200 hover:scale-[1.02] transition-all duration-200"
        onClick={() => setProductModalOpen(true)}
      >
        <div className="relative bg-blue-50/30 p-2 rounded-lg border border-blue-100 mb-4 group z-0">
          {/* Buttons */}
          {user && (
            <>
              <button
                className="absolute top-2 left-2 bg-white/90 text-red-500 rounded-full p-2 shadow-sm hover:bg-red-100/80 hover:shadow-md z-20 transition-all"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsPrCardDeleteModalOpen(true);
                }}
              >
                <FiTrash className="w-4 h-4" />
              </button>
              <button
                className="absolute top-2 right-2 bg-white/90 text-red-500 rounded-full p-2 shadow-sm hover:bg-red-100/80 hover:shadow-md z-20 transition-all"
                onClick={handleToggleFavorite}
              >
                {isFavorite(item.id) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                )}
              </button>
            </>
          )}

          {/* Image */}
          <img
            src={thumb}
            alt="product preview"
            className="w-full h-40 object-contain rounded-md transition-transform duration-300 group-hover:scale-95"
          />
        </div>

        {/* Content */}
        <div className="text-center px-4 pb-4">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">{name}</h3>
          <ul className="text-left text-sm space-y-2 text-blue-900/80">
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H3m16 0h2m-2 0h-2m4-18H9m6 0V3M9 9h6m-6 4h6m4-4h2m-2 4h2M3 11h18"
                />
              </svg>
              <span>{manufacturer}</span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H3m16 0h2m-2 0H5m12 0h2M9 7h2m-2 4h2m4-4h2m-2 4h2M9 15h6"
                />
              </svg>
              <span className="flex-1">Industries: {industries}</span>
            </li>
          </ul>
        </div>
      </li>

      {/* Modals */}
      {isProductModalOpen && !isCollectionModalOpen && (
        <ProductModal
          onClose={handleProductModalClose}
          isFavorite={isFavorite(item.id)}
          handleToggleFavorite={handleToggleFavorite}
          handleOpenCollectionModal={() => setIsCollectionModalOpen(true)}
          thumb={thumb}
          item={item}
          name={name}
          material={material}
          manufacturer={manufacturer}
          fileName={fileName}
          colors={colors}
          tags={tags}
          industries={industries}
        />
      )}
      {isCollectionModalOpen && (
        <AddToCollectionModal onClose={handleCollectionModalClose} item={item} />
      )}
      {isPrCardDeleteModalOpen && (
        <DeletePrCardModal
          onClose={handleDeletePrCardModalClose}
          collectionTitle={collectionTitle}
          itemName={item.name}
          id={item.id}
        />
      )}
    </>
  );
}
