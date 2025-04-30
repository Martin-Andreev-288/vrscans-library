import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { type VRScan, type FilterSelection } from "../utils/types";
import { useDebounce } from "../hooks/useDebounce";

type DataContextType = {
  vrscans: VRScan[];
  refreshVrscans: () => Promise<void>;
  loadMoreVrscans: () => Promise<void>;
  filterSelection: FilterSelection;
  setFilterSelection: (selection: FilterSelection) => void;
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

function createQueryParamsFromFiltersAndSearch(selection: FilterSelection) {
  // expected: [["colors", "3"], ["colors", "16"], ["tags", "35"]]
  const result: [string, string][] = [];
  selection.colors.forEach((color) => result.push(["colors", String(color)]));
  selection.materials.forEach((material) => result.push(["materials", String(material)]));
  selection.tags.forEach((tag) => result.push(["tags", String(tag)]));

  if (selection.searchTerm) {
    result.push(["search", selection.searchTerm]);
  }

  return String(new URLSearchParams(result));
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [vrscans, setVrscans] = useState<VRScan[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filterSelection, setFilterSelection] = useState<FilterSelection>({
    materials: new Set(),
    colors: new Set(),
    tags: new Set(),
    searchTerm: ""
  });

  const debouncedFilterSelection = useDebounce(filterSelection, 500);

  useEffect(() => {
    console.log("endless loop testing");
    refreshVrscans();
  }, [debouncedFilterSelection]);

  async function refreshVrscans(): Promise<void> {
    setIsLoading(true);
    try {
      const query = createQueryParamsFromFiltersAndSearch(filterSelection);
      const vrscansResponse = await apiClient.get<VRScan[]>(`/searchVrscans?${query}&page=1`);
      setVrscans(vrscansResponse.data);
      setCurrentPage(1);
      setHasMore(vrscansResponse.data.length === 20);
      setError(null);
    } catch (error) {
      console.error("Failed to refresh VRScans:", error);
      setError("Failed to refresh VRScans");
    } finally {
      setIsLoading(false);
    }
  }

  async function loadMoreVrscans(): Promise<void> {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const query = createQueryParamsFromFiltersAndSearch(filterSelection);
      const vrscansResponse = await apiClient.get<VRScan[]>(
        `/searchVrscans?${query}&page=${nextPage}`
      );

      setVrscans((prev) => [...prev, ...vrscansResponse.data]);
      setCurrentPage(nextPage);
      setHasMore(vrscansResponse.data.length === 20);
      setError(null);
    } catch (error) {
      console.error("Failed to load more VRScans:", error);
      setError("Failed to load more VRScans");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <DataContext.Provider
      value={{
        vrscans,
        refreshVrscans,
        loadMoreVrscans,
        filterSelection,
        setFilterSelection,
        isLoading,
        error,
        hasMore
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
