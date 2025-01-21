import { useState } from "react";
import { FilterSection } from "../../components";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";
import { useDataContext } from "../../context/DataContext";

export default function ProductsFilters() {
  const { filterSelection, setFilterSelection } = useDataContext();

  const { colors, materials, tags } = useFetchFiltersData();
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
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
