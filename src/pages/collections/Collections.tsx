import GenericPage from "../../components/genericPage/GenericPage";
import { CollectionCards, CollectionsSidebar } from "../../features";

export default function Collections() {
  return (
    <GenericPage SidebarComponent={CollectionsSidebar} title="Collections" isLoading={false}>
      <CollectionCards />
    </GenericPage>
  );
}
