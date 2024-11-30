export default function ProductsFilters() {
  const filterCards = [
    {
      title: "Materials",
      options: ["Fabric", "Paint", "Metal", "Plastic"]
    },
    {
      title: "Colors",
      options: ["Black", "Red", "Blue", "Green"]
    },
    {
      title: "Tags",
      options: ["Glossy", "Rust", "Matte", "Brushed"]
    }
  ];

  return (
    <div className="space-y-6">
      {filterCards.map((card, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          {/* Card Title */}
          <h3 className="text-lg font-semibold mb-2">{card.title}</h3>

          {/* Separator */}
          <hr className="border-gray-300 mb-4" />

          {/* Options */}
          <ul className="space-y-2">
            {card.options.map((option, i) => (
              <li key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`${card.title}-${i}`}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled
                />
                <label htmlFor={`${card.title}-${i}`} className="text-sm text-gray-700">
                  {option}
                </label>
              </li>
            ))}
          </ul>

          {/* View All Button */}
          <div className="text-right mt-4">
            <button className="text-blue-500 text-sm hover:underline" disabled>
              View All...
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
