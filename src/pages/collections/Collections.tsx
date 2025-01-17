import { CollectionCards, CollectionsSidebar } from "../../features";

export default function Collections() {
  return (
    <div className="main">
      <aside className="pt-14">
        <CollectionsSidebar />
      </aside>
      <div className="p-2 pt-0">
        <h1 className="text-xl font-bold mb-6 text-center">Collections</h1>
        <CollectionCards />
      </div>
    </div>
  );
}
