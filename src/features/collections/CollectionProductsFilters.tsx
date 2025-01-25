import { useState, useCallback } from "react";
import { FilterSection } from "../../components";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";
import { type FilterSelection } from "../../utils/types";

type CollectionProductsFiltersProps = {
  collItemsFilterSelection: FilterSelection;
  setCollItemsFilterSelection: (selection: FilterSelection) => void;
};

export default function CollectionProductsFilters({
  collItemsFilterSelection,
  setCollItemsFilterSelection
}: CollectionProductsFiltersProps) {
  const { colors, materials, tags } = useFetchFiltersData();
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);
  const toggleFilter = (filter: string) => {
    setExpandedFilter(expandedFilter === filter ? null : filter);
  };

  const updateSelection = useCallback(
    (selection: Set<number>, type: "materials" | "colors" | "tags") => {
      const newFilterSelection = { ...collItemsFilterSelection };
      newFilterSelection[type] = selection;
      setCollItemsFilterSelection(newFilterSelection);
    },
    []
  );

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
