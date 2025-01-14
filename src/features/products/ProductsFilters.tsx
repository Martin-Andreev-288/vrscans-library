import { useState } from "react";
import { FilterSection } from "../../components";
import { useFetchFiltersData } from "../../hooks/useFetchFiltersData";

export default function ProductsFilters() {
  const { colors, materials, tags } = useFetchFiltersData();
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  // Extract options for each filter
  const materialOptions = materials.map((material) => material.name);
  const colorOptions = colors.map((color) => color.name);
  const tagOptions = tags.map((tag) => tag.name);

  const toggleFilter = (filter: string) => {
    setExpandedFilter(expandedFilter === filter ? null : filter);
  };

  return (
    <div className="space-y-6">
      <FilterSection
        title="Materials"
        options={materialOptions}
        isOpen={expandedFilter === "Materials"}
        onToggle={() => toggleFilter("Materials")}
      />
      <FilterSection
        title="Colors"
        options={colorOptions}
        isOpen={expandedFilter === "Colors"}
        onToggle={() => toggleFilter("Colors")}
      />
      <FilterSection
        title="Tags"
        options={tagOptions}
        isOpen={expandedFilter === "Tags"}
        onToggle={() => toggleFilter("Tags")}
      />
    </div>
  );
}
