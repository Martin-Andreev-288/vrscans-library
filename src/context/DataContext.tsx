import { createContext, useContext, useState } from "react";
import { apiClient } from "../utils/apiClient";
import { type VRScan } from "../utils/types";

type DataContextType = {
  vrscans: VRScan[];
  updateVrscans: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [vrscans, setVrscans] = useState<VRScan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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

  return (
    <DataContext.Provider
      value={{
        vrscans,
        updateVrscans,
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
