import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiClient } from "../../utils/apiClient";
import { Tag } from "../../utils/types";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiClient.defaults.baseURL
  }),
  endpoints(builder) {
    return {
      fetchTags: builder.query<Tag[], void>({
        query: () => {
          return {
            url: "/tags",
            method: "GET"
          };
        }
      })
    };
  }
});

export const { useFetchTagsQuery } = tagsApi;
