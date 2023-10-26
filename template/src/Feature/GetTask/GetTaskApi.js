import Api from "../Api/Api";

export const GetTaskApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    getProject: builder.query({
      query: () => `/projects`,
    }),

    getTeamMember: builder.query({
      query: () => `/team`,
    }),

    getAllTask: builder.query({
      query: () => `/tasks`,
    }),

    getSingleTask: builder.query({
      query: (id) => `/tasks/${id}`,
    }),
  }),
});

export const {
  useGetProjectQuery,
  useGetTeamMemberQuery,
  useGetAllTaskQuery,
  useGetSingleTaskQuery,
} = GetTaskApi;
