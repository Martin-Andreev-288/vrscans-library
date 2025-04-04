import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import CollectionItemsContainer from "./CollectionItemsContainer";
import CollectionCard from "./CollectionCard";
import { type FilterSelection } from "../../utils/types";
import { useMemo } from "react";

type CollectionContainerProps = {
  viewingItems: string | null;
  setViewingItems: React.Dispatch<React.SetStateAction<string | null>>;
  collItemsFilterSelection: FilterSelection;
  sortBy: string;
  searchQuery: string;
};

export default function CollectionContainerContainer({
  viewingItems,
  setViewingItems,
  collItemsFilterSelection,
  sortBy,
  searchQuery
}: CollectionContainerProps) {
  const collections = useSelector((state: RootState) => state.collections);

  const emptyPageText = "No collections found. Add your first collection to get started.";

  const processedColls = useMemo(() => {
    let filteredColls = [...collections];
    // Alphabetical sorting:
    filteredColls.sort((a, b) => {
      if (sortBy === "a-z" || sortBy === "z-a") {
        const titleA = a.title.toLowerCase();
        const titleB = b.title.toLowerCase();
        return sortBy === "a-z" ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
      }
      // Date sorting:
      return sortBy === "newest"
        ? b.createdAt.localeCompare(a.createdAt) // Newest first
        : a.createdAt.localeCompare(b.createdAt); // Oldest first
    });
    // Search filter by collection title:
    if (searchQuery.trim()) {
      filteredColls = filteredColls.filter((coll) =>
        coll.title.toLowerCase().includes(searchQuery)
      );
    }

    return filteredColls;
  }, [collections, sortBy, searchQuery]);

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
      {processedColls.length ? (
        <ul className="card-container">
          {processedColls.map((collection) => (
            <CollectionCard
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
