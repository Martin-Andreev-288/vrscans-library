import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from "../utils/apiClient";
import {
  type VRScan,
  type Material,
  type Manufacturer,
  type Industry,
  type Color,
  type Tag
} from "../utils/types";

type DataContextType = {
  vrscans: VRScan[];
  updateVrscans: () => Promise<void>;
  materials: Material[];
  manufacturers: Manufacturer[];
  industries: Industry[];
  colors: Color[];
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [vrscans, setVrscans] = useState<VRScan[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function updateVrscans(): Promise<void> {
    setIsLoading(true);
    try {
      const vrscansResponse = await apiClient.get<VRScan[]>("/vrscans");
      setVrscans(vrscansResponse.data);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch VRScans:", error);
      setError("Failed to fetch VRScans");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [
          materialsResponse,
          manufacturersResponse,
          industriesResponse,
          colorsResponse,
          tagsResponse
        ] = await Promise.all([
          apiClient.get<Material[]>("/materials"),
          apiClient.get<Manufacturer[]>("/manufacturers"),
          apiClient.get<Industry[]>("/industries"),
          apiClient.get<Color[]>("/colors"),
          apiClient.get<Tag[]>("/tags")
        ]);

        setMaterials(materialsResponse.data);
        setManufacturers(manufacturersResponse.data);
        setIndustries(industriesResponse.data);
        setColors(colorsResponse.data);
        setTags(tagsResponse.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        vrscans,
        updateVrscans,
        materials,
        manufacturers,
        industries,
        colors,
        tags,
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
