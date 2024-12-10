import { CollectionsCard, CollectionsSidebar } from "../components";

export default function Collections() {
  const collections = Array(12).fill(null);

  return (
    <div className="main">
      <aside>
        <CollectionsSidebar />
      </aside>
      <div className="p-2">
        <h1 className="text-2xl font-bold mb-6 text-center">Collections</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {collections.map((_, index) => (
            <CollectionsCard key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
}
