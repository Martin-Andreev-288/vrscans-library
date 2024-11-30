import productImage from "/src/assets/imgMatCard.png";

export default function ProductCard() {
  return (
    <li className="relative flex flex-col h-[300px] w-full p-4 bg-white border rounded-lg shadow-md">
      {/* Buttons */}
      <button className="absolute top-2 left-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300">
        +
      </button>
      <button className="absolute top-2 right-2 bg-gray-200 text-gray-600 rounded-full p-2 hover:bg-gray-300">
        ♡
      </button>

      {/* Image */}
      <img
        src={productImage}
        alt="image not found"
        className="w-full h-40 object-fill rounded-md mb-4"
      />

      {/* Content */}
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Cnv82</h3>
        <ul className="text-left text-sm">
          <li className="pl-2">Fabric</li>
          <li className="pl-2">Manufacturer: Handy Living</li>
        </ul>
      </div>
    </li>
  );
}
