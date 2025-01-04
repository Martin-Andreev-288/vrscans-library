type FilterSectionProps = {
  title: string;
  options: string[];
  isOpen: boolean;
  onToggle: () => void;
};

export default function FilterSection({ title, options, isOpen, onToggle }: FilterSectionProps) {
  // Limit options to the first 4 for each filter when the current filter isn't expanded
  const displayedOptions = isOpen ? options : options.slice(0, 4);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      {/* Filter Title */}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>

      {/* Separator */}
      <hr className="border-gray-300 mb-4" />

      {/* Options */}
      <ul className="space-y-2">
        {displayedOptions.map((option, index) => (
          <li key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              id={`${title}-${index}`}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={`${title}-${index}`} className="text-sm text-gray-700">
              {option}
            </label>
          </li>
        ))}
      </ul>

      {/* Toggle Button */}
      <div className="text-right mt-4">
        <button className="text-blue-500 text-sm hover:underline" onClick={onToggle}>
          {isOpen ? "Show Less" : "View All..."}
        </button>
      </div>
    </div>
  );
}
