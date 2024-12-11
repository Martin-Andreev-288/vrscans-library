import { CollectionsCard, CollectionsSidebar } from "../components";
import GenericPage from "./GenericPage";

export default function Collections() {
  const collections = Array(12).fill(null);
  const emptyPageText = "No collections found. Add your first collection to get started.";

  return (
    <GenericPage
      SidebarComponent={CollectionsSidebar}
      title="Collections"
      items={collections}
      ComponentCard={CollectionsCard}
      emptyPageText={emptyPageText}
    />
  );
}
