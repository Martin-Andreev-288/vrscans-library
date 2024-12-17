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
  logo_file_name: string;
  logo_content_type: string;
  logo_file_size: number;
  logo_updated_at: string;
  website: string;
};
