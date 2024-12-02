import CollectionsCard from "../collectionsCard/CollectionsCard";

export default function CollectionsContainer() {
  const collections = Array(12).fill(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Collections</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {collections.map((_, index) => (
          <CollectionsCard key={index} />
        ))}
      </ul>
    </div>
  );
}
