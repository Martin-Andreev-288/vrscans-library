import { CollectionsCard, CollectionsSidebar } from "../../features";
import GenericPage from "../../components/genericPage/GenericPage";
import { useDataContext } from "../../context/DataContext";

export default function Collections() {
  const { isLoading } = useDataContext();
  const collections = Array(12).fill(null);
  const emptyPageText = "No collections found. Add your first collection to get started.";

  return (
    <GenericPage
      SidebarComponent={CollectionsSidebar}
      title="Collections"
      emptyPageText={emptyPageText}
      isLoading={isLoading}
    >
      {collections.map((collection) => (
        <CollectionsCard />
      ))}
    </GenericPage>
  );
}
