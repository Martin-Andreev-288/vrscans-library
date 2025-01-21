import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { type VRScan } from "../utils/types";

type FilterSelection = {
  materials: Set<number>;
  colors: Set<number>;
  tags: Set<number>;
};

type DataContextType = {
  vrscans: VRScan[];
  updateVrscans: () => Promise<void>;
  filterSelection: FilterSelection;
  setFilterSelection: (selection: FilterSelection) => void;
  isLoading: boolean;
  error: string | null;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [vrscans, setVrscans] = useState<VRScan[]>([]);
  const [allVrscans, setAllVrscans] = useState<VRScan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // tuk dolu shte syrhanqvame id-tata na materialite, color-ite i cvetovete
  const [filterSelection, setFilterSelection] = useState<FilterSelection>({
    materials: new Set(),
    colors: new Set(),
    tags: new Set()
  });

  const filterVrscans = (vrscans: VRScan[]) =>
    vrscans.filter((vrscan) => {
      const acceptsMaterials =
        !filterSelection.materials.size || filterSelection.materials.has(vrscan.materialTypeId);
      const acceptsColors =
        !filterSelection.colors.size ||
        vrscan.colors.some((color) => filterSelection.colors.has(color));
      const acceptsTags =
        !filterSelection.tags.size || vrscan.tags.some((tag) => filterSelection.tags.has(tag));

      return acceptsMaterials && acceptsColors && acceptsTags;
    });

  useEffect(() => {
    // console.log(filterSelection);
    setVrscans(filterVrscans(allVrscans));
  }, [filterSelection]);

  async function updateVrscans(): Promise<void> {
    setIsLoading(true);
    try {
      const vrscansResponse = await apiClient.get<VRScan[]>("/vrscans");
      setAllVrscans(vrscansResponse.data);
      setVrscans(filterVrscans(vrscansResponse.data));
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
