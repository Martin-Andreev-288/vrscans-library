import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../../utils/apiClient";
import { Manufacturer } from "../../utils/types";

export const manufacturersApi = createApi({
  reducerPath: "manufacturersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiClient.defaults.baseURL
  }),
  endpoints(builder) {
    return {
      fetchManufacturers: builder.query<Manufacturer[], void>({
        query: () => {
          return {
            url: "/manufacturers",
            method: "GET"
          };
        }
      })
    };
  }
});

export const { useFetchManufacturersQuery } = manufacturersApi;
