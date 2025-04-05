import { Button } from "../../components";
import CollectionProductCard from "./CollectionProductCard";
import { type VRScan, type CollectionState } from "../../utils/types";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";

type CollectionItemsProps = {
  collItems: VRScan[];
  allCollItems: VRScan[];
  currentCollection: CollectionState;
  setViewingItems: React.Dispatch<React.SetStateAction<string | null>>;
};

function CollectionItems({
  collItems,
  allCollItems,
  currentCollection,
  setViewingItems
}: CollectionItemsProps) {
  const { colors, industries, manufacturers, materials, tags } = useFetchFiltersData();

  const emptyPageText =
    allCollItems.length === 0
      ? "No items in this collection."
      : "No items match your search/filters ✖️ Try adjusting your criteria or clear filters";

  return (
    <>
      {collItems.length ? (
        <ul className="card-container">
          {collItems.map((item) => (
            <CollectionProductCard
              key={item.id}
              item={item}
              name={item.name}
              thumb={item.thumb}
              fileName={item.fileName}
              material={
                materials.find((m) => m.id === item.materialTypeId)?.name || "Unknown Material"
              }
              manufacturer={
                manufacturers.find((m) => m.id === item.manufacturerId)?.name ||
                "Unknown Manufacturer"
              }
              industries={
                item.industries
                  .map((id) => industries.find((ind) => ind.id === id)?.name)
                  .join(", ") || "Unknown Industries"
              }
              colors={
                item.colors.map((id) => colors.find((col) => col.id === id)?.name).join(", ") ||
                "Unknown Colors"
              }
              tags={
                item.tags.map((id) => tags.find((tag) => tag.id === id)?.name).join(", ") ||
                "Unknown Tags"
              }
              collectionTitle={currentCollection.title}
            />
          ))}
        </ul>
      ) : (
        <h1 className="text-center text-gray-500">{emptyPageText}</h1>
      )}
      <div className="mt-6 flex justify-center">
        <Button type="viewItemsButton" onClick={() => setViewingItems(null)}>
          Back to Collections
        </Button>
      </div>
    </>
  );
}

export default CollectionItems;
