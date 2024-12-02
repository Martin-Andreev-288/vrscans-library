import FavoriteProductCard from "../favoriteProductCard/FavoriteProductCard";

export default function FavoritesContainer() {
  const products = Array(9).fill(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Favorites</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {products.map((_, index) => (
          <FavoriteProductCard key={index} />
        ))}
      </ul>
    </div>
  );
}
