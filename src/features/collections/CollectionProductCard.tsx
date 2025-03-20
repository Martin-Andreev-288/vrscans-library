import { useState } from "react";
import ProductModal from "../products/ProductModal";
import DeletePrCardModal from "./DeletePrCardModal";
import AddToCollectionModal from "../collections/AddToCollectionModal";
import { useDispatch, useSelector } from "react-redux";
import { addToFavs, removeFromFavs } from "../../store/slices/favoritesSlice";
import { removeItemFromCollection } from "../../store/slices/collectionsSlice";
import { type VRScan } from "../../utils/types";
import { RootState } from "../../store/store";
import { FiTrash } from "react-icons/fi";

export type CollectionProductCardProps = {
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

export default function CollectionProductCard({
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
}: CollectionProductCardProps) {
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

  const handleRemoveItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    collTitle: string,
    itemId: number
  ) => {
    e.stopPropagation();
    dispatch(
      removeItemFromCollection({
        collectionTitle: collTitle,
        itemId
      })
    );
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
        className="relative flex flex-col h-[320px] w-full bg-white border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 hover:shadow-lg hover:scale-105 transition-transform duration-200"
        onClick={() => setProductModalOpen(true)}
      >
        <div className="relative bg-gray-50 p-2 rounded-lg border border-gray-100 mb-4 group z-0">
          {/* Buttons */}
          {user && (
            <>
              <button
                className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 z-20"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsPrCardDeleteModalOpen(true);
                }}
              >
                <FiTrash />
              </button>
              <button
                className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300 z-20"
                onClick={handleToggleFavorite}
              >
                {isFavorite(item.id) ? "♥" : "♡"}
              </button>
            </>
          )}

          {/* Image */}
          <img
            src={thumb}
            alt="image not found"
            className="w-full h-40 object-contain rounded-md transition-transform duration-300 group-hover:scale-95"
          />
        </div>

        {/* Content */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <ul className="text-left text-sm">
            <li className="pl-6">{material}</li>
            <li className="pl-6">Manufacturer: {manufacturer}</li>
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
