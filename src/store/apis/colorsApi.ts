import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../../utils/apiClient";
import { Color } from "../../utils/types";

export const colorsApi = createApi({
  reducerPath: "colorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiClient.defaults.baseURL
  }),
  endpoints(builder) {
    return {
      fetchColors: builder.query<Color[], void>({
        query: () => {
          return {
            url: "/colors",
            method: "GET"
          };
        }
      })
    };
  }
});

export const { useFetchColorsQuery } = colorsApi;
