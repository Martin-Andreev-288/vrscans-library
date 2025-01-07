import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../../utils/apiClient";
import { Industry } from "../../utils/types";

export const industriesApi = createApi({
  reducerPath: "industriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiClient.defaults.baseURL
  }),
  endpoints(builder) {
    return {
      fetchIndustries: builder.query<Industry[], void>({
        query: () => {
          return {
            url: "/industries",
            method: "GET"
          };
        }
      })
    };
  }
});

export const { useFetchIndustriesQuery } = industriesApi;
