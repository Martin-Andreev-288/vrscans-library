import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CollectionItemsContainer from "./CollectionItemsContainer";
import CollectionCards from "./CollectionCards";
import { type FilterSelection } from "../../utils/types";

type CollectionContainerProps = {
  viewingItems: string | null;
  setViewingItems: React.Dispatch<React.SetStateAction<string | null>>;
  collItemsFilterSelection: FilterSelection;
};

export default function CollectionContainerContainer({
  viewingItems,
  setViewingItems,
  collItemsFilterSelection
}: CollectionContainerProps) {
  const collections = useSelector((state: RootState) => state.collections);

  const emptyPageText = "No collections found. Add your first collection to get started.";

  if (viewingItems) {
    return (
      <CollectionItemsContainer
        viewingItems={viewingItems}
        setViewingItems={setViewingItems}
        collItemsFilterSelection={collItemsFilterSelection}
      />
    );
  }

  return (
    <>
      {collections.length ? (
        <ul className="card-container">
          {collections.map((collection) => (
            <CollectionCards
              key={collection.title}
              title={collection.title}
              setViewingItems={setViewingItems}
            />
          ))}
        </ul>
      ) : (
        <h1 className="text-xl font-bold mb-6 text-center">{emptyPageText}</h1>
      )}
    </>
  );
}
