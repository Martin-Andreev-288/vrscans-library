import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../../utils/apiClient";
import { Material } from "../../utils/types";

export const materialsApi = createApi({
  reducerPath: "materialsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiClient.defaults.baseURL
  }),
  endpoints(builder) {
    return {
      fetchMaterials: builder.query<Material[], void>({
        query: () => {
          return {
            url: "/materials",
            method: "GET"
          };
        }
      })
    };
  }
});

export const { useFetchMaterialsQuery } = materialsApi;
