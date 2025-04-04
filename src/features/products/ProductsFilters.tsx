import { useState } from "react";
import { FilterSection } from "../../components";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";
import { useDataContext } from "../../context/DataContext";

export default function ProductsFilters() {
  const { filterSelection, setFilterSelection } = useDataContext();
  const { colors, materials, tags } = useFetchFiltersData();
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterSelection({
      ...filterSelection,
      searchTerm: e.target.value
    });
  };

  const toggleFilter = (filter: string) => {
    setExpandedFilter(expandedFilter === filter ? null : filter);
  };

  const updateSelection = (selection: Set<number>, type: "materials" | "colors" | "tags") => {
    const newFilterSelection = { ...filterSelection };
    newFilterSelection[type] = selection;
    setFilterSelection(newFilterSelection);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search materials..."
          className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filterSelection.searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <FilterSection
        title="Materials"
        options={materials}
        isOpen={expandedFilter === "Materials"}
        onToggle={() => toggleFilter("Materials")}
        onUpdate={(selection) => updateSelection(selection, "materials")}
      />
      <FilterSection
        title="Colors"
        options={colors}
        isOpen={expandedFilter === "Colors"}
        onToggle={() => toggleFilter("Colors")}
        onUpdate={(selection) => updateSelection(selection, "colors")}
      />
      <FilterSection
        title="Tags"
        options={tags}
        isOpen={expandedFilter === "Tags"}
        onToggle={() => toggleFilter("Tags")}
        onUpdate={(selection) => updateSelection(selection, "tags")}
      />
    </div>
  );
}
