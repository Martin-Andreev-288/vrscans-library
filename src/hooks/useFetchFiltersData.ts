import { useFetchColorsQuery } from "../store/apis/colorsApi";
import { useFetchIndustriesQuery } from "../store/apis/industriesApi";
import { useFetchManufacturersQuery } from "../store/apis/manufacturersApi";
import { useFetchMaterialsQuery } from "../store/apis/materialsApi";
import { useFetchTagsQuery } from "../store/apis/tagsApi";

export function useFetchFiltersData() {
  const { data: colors = [] } = useFetchColorsQuery();
  const { data: industries = [] } = useFetchIndustriesQuery();
  const { data: manufacturers = [] } = useFetchManufacturersQuery();
  const { data: materials = [] } = useFetchMaterialsQuery();
  const { data: tags = [] } = useFetchTagsQuery();

  return { colors, industries, manufacturers, materials, tags };
}
