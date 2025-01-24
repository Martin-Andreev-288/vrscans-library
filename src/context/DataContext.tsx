import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { type VRScan, type FilterSelection } from "../utils/types";

type DataContextType = {
  vrscans: VRScan[];
  updateVrscans: () => Promise<void>;
  filterSelection: FilterSelection;
  setFilterSelection: (selection: FilterSelection) => void;
  isLoading: boolean;
  error: string | null;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

function createQueryParamsFromFilterSelection(selection: FilterSelection) {
  // expected: [["colors", "3"], ["colors", "16"], ["tags", "35"]]
  const result: [string, string][] = [];
  selection.colors.forEach((color) => result.push(["colors", String(color)]));
  selection.materials.forEach((material) => result.push(["materials", String(material)]));
  selection.tags.forEach((tag) => result.push(["tags", String(tag)]));
  return String(new URLSearchParams(result));
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [vrscans, setVrscans] = useState<VRScan[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filterSelection, setFilterSelection] = useState<FilterSelection>({
    materials: new Set(),
    colors: new Set(),
    tags: new Set()
  });

  useEffect(() => {
    updateVrscans();
  }, [filterSelection]);

  async function updateVrscans(): Promise<void> {
    setIsLoading(true);
    try {
      const query = createQueryParamsFromFilterSelection(filterSelection);
      const vrscansResponse = await apiClient.get<VRScan[]>(`/searchVrscans?${query}`);
      setVrscans(vrscansResponse.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch VRScans:", error);
      setError("Failed to fetch VRScans");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DataContext.Provider
      value={{
        vrscans,
        updateVrscans,
        filterSelection,
        setFilterSelection,
        isLoading,
        error
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useDataContext(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
}
