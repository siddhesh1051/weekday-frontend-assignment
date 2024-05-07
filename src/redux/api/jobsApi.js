import { api } from "./apiSlice";

const jobsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSampleJd: builder.mutation({
      query: (body) => ({
        url: `/adhoc/getSampleJdJSON`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetSampleJdMutation } = jobsApi;
