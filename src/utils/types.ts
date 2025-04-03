export type VRScan = {
  id: number;
  name: string;
  thumb: string;
  fileName: string;
  materialTypeId: number;
  manufacturerId: number;
  industries: number[];
  colors: number[];
  tags: number[];
  materialFileSize: number;
  createdAt: string;
};

export type Material = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Manufacturer = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  logo_file_name: string | null;
  logo_content_type: string | null;
  logo_file_size: number | null;
  logo_updated_at: string | null;
  website: string | null;
};

export type Industry = {
  id: number;
  name: string;
  vrscan_id: number;
};

export type Color = {
  id: number;
  hex: string;
  key: string;
  name: string;
  colorable_id: number;
};

export type Tag = {
  id: number;
  name: string;
  taggable_id: number;
};

export type DataContextType = {
  materials: Material[];
  colors: Color[];
  tags: Tag[];
  isLoading: boolean;
  error: string | null;
};

export type CollectionState = {
  title: string;
  items: VRScan[];
};

export type FilterSelection = {
  materials: Set<number>;
  colors: Set<number>;
  tags: Set<number>;
  searchTerm: string;
};
