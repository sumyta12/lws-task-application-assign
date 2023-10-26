import Api from "../Api/Api";
import { GetTaskApi } from "../GetTask/GetTaskApi";

export const TaskAddEdit = Api.injectEndpoints({
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: (data) => ({
        url: `/tasks`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: async (result, { queryFulfilled, dispatch }) => {
        try {
          const fullfill = await queryFulfilled;
          if (fullfill?.data?.id) {
            //passimistic update start
            dispatch(
              Api.util.updateQueryData("getAllTask", undefined, (draft) => {
                draft.push(fullfill?.data);
              })
            );
            //passimistic update end
          }
        } catch (e) {}
      },
    }),

    editTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      onQueryStarted: async ({ id }, { queryFulfilled, dispatch }) => {
        try {
          const fullfill = await queryFulfilled;
          if (fullfill?.data?.id) {
            //passimistic update start

            dispatch(
              Api.util.updateQueryData(
                "getSingleTask",
                id.toString(),
                (draft) => {
                  draft.taskName = fullfill?.data?.taskName;
                  draft.teamMember.name = fullfill?.data?.teamMember.name;
                  draft.project.projectName =
                    fullfill?.data?.project.projectName;
                  draft.deadline = fullfill?.data?.deadline;
                  draft.status = fullfill?.data?.status;
                }
              )
            );
            dispatch(
              Api.util.updateQueryData("getAllTask", undefined, (draft) => {
                const tasks = draft?.find((task) => task.id == id);
                tasks.taskName = fullfill?.data?.taskName;
                tasks.teamMember.avatar = fullfill?.data?.teamMember.avatar;
                tasks.teamMember.name = fullfill?.data?.teamMember.name;
                tasks.project.projectName = fullfill?.data?.project.projectName;
                tasks.deadline = fullfill?.data?.deadline;
              })
            );
            //passimistic update end
          }
        } catch (e) {}
      },
    }),
  }),
});

export const { useAddTaskMutation, useEditTaskMutation } = TaskAddEdit;
