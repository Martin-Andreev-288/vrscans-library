import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { CollectionCard, CollectionsSidebar } from "../../features";
import GenericPage from "../../components/genericPage/GenericPage";

export default function Collections() {
  const collections = useSelector((state: RootState) => state.collections);

  const emptyPageText = "No collections found. Add your first collection to get started.";

  return (
    <GenericPage
      SidebarComponent={CollectionsSidebar}
      title="Collections"
      emptyPageText={emptyPageText}
      isLoading={false}
    >
      {collections.length &&
        collections.map((collection) => (
          <CollectionCard key={collection.title} collection={collection} />
        ))}
    </GenericPage>
  );
}
