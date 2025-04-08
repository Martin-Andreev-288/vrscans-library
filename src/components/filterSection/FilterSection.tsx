import { useEffect, useState } from "react";

type FilterOption = {
  id: number;
  name: string;
};

type FilterSectionProps = {
  title: string;
  options: FilterOption[];
  isOpen: boolean;
  onToggle?: () => void;
  onUpdate?: (selection: Set<number>) => void;
};

export default function FilterSection({
  title,
  options,
  isOpen,
  onToggle,
  onUpdate
}: FilterSectionProps) {
  const [selection, setSelection] = useState<Set<number>>(new Set());

  useEffect(() => {
    onUpdate?.(selection);
  }, [selection]);

  // Limit options to the first 4 for each filter when the current filter isn't expanded
  const displayedOptions = isOpen ? options : options.slice(0, 4);

  const toggleOption = (option: FilterOption) => {
    if (selection.has(option.id)) {
      const newSelection = new Set(selection);
      newSelection.delete(option.id);
      setSelection(newSelection);
    } else {
      const newSelection = new Set(selection);
      newSelection.add(option.id);
      setSelection(newSelection);
    }
  };

  return (
    <div
      className={`bg-white/50 backdrop-blur-sm p-4 rounded-xl shadow-sm
      border-2 border-blue-100/30 hover:border-blue-200/50 transition-all
      ${isOpen ? "ring-2 ring-blue-100/50" : ""}`}
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={onToggle}>
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h3 className="text-blue-800 font-semibold text-base">{title}</h3>
        </div>
      </div>

      {/* Separator */}
      <hr className="border-gray-300 mb-4" />

      {/* Options */}
      <div className={`${isOpen ? "max-h-[300px] overflow-y-auto pb-2 filter-scrollbar" : ""}`}>
        <ul className="space-y-2">
          {displayedOptions.map((option, index) => (
            <li
              key={index}
              className="group flex items-center gap-2 p-2 hover:bg-blue-50/30 rounded-lg"
            >
              <input
                type="checkbox"
                id={`${title}-${index}`}
                checked={selection.has(option.id)}
                onChange={() => toggleOption(option)}
                className="w-4 h-4 text-blue-500 border-2 border-blue-200/70 rounded-md
                    focus:ring-blue-300/50 cursor-pointer checked:bg-blue-500/80"
              />
              <label
                htmlFor={`${title}-${index}`}
                className="text-sm text-blue-700/90 cursor-pointer"
              >
                {option.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Button */}
      <div className="mt-3">
        {options.length > 4 && (
          <button
            className="w-full flex items-center justify-center gap-1 text-blue-500/90 text-sm
              px-3 py-1.5 rounded-lg bg-white/50 hover:bg-blue-50/40 transition-colors"
            onClick={onToggle}
          >
            {isOpen ? (
              <>
                <span>Show Less</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>View All...</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
