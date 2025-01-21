import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { type VRScan } from "../utils/types";

type FilterSelection = {
  materials: Set<number>;
  colors: Set<number>;
  tags: Set<number>;
};

type DataContextType = {
  vrscans: VRScan[];
  updateVrscans: () => Promise<void>;
  favs: VRScan[];
  updateFavs: () => void;
  filterSelection: FilterSelection;
  setFilterSelection: (selection: FilterSelection) => void;
  favsFilterSelection: FilterSelection;
  setFavsFilterSelection: (selection: FilterSelection) => void;
  isLoading: boolean;
  error: string | null;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [vrscans, setVrscans] = useState<VRScan[]>([]);
  const [allVrscans, setAllVrscans] = useState<VRScan[]>([]);
  const [favs, setFavs] = useState<VRScan[]>([]);
  const [allFavs, setAllFavs] = useState<VRScan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const favProducts = useSelector((state: RootState) => state.favItems);

  const [filterSelection, setFilterSelection] = useState<FilterSelection>({
    materials: new Set(),
    colors: new Set(),
    tags: new Set()
  });

  const [favsFilterSelection, setFavsFilterSelection] = useState<FilterSelection>({
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

  const filterFavs = (favs: VRScan[]) =>
    favs.filter((fav) => {
      const acceptsMaterials =
        !favsFilterSelection.materials.size ||
        favsFilterSelection.materials.has(fav.materialTypeId);
      const acceptsColors =
        !favsFilterSelection.colors.size ||
        fav.colors.some((color) => favsFilterSelection.colors.has(color));
      const acceptsTags =
        !favsFilterSelection.tags.size || fav.tags.some((tag) => favsFilterSelection.tags.has(tag));

      return acceptsMaterials && acceptsColors && acceptsTags;
    });

  useEffect(() => {
    setFavs(filterFavs(allFavs));
  }, [favsFilterSelection]);

  function updateFavs() {
    // const favProducts = useSelector((state: RootState) => state.favItems);
    setAllFavs(favProducts);
    setFavs(filterFavs(favProducts));
  }

  return (
    <DataContext.Provider
      value={{
        vrscans,
        updateVrscans,
        favs,
        updateFavs,
        filterSelection,
        setFilterSelection,
        favsFilterSelection,
        setFavsFilterSelection,
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
