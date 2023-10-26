import Api from "../Api/Api";

const TaskApi = Api.injectEndpoints({
  endpoints: (builder) => ({
    editStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: {
          id,
          status,
        },
      }),
      onQueryStarted: async ({ id }, { queryFulfilled, dispatch }) => {
        try {
          const fullfilled = await queryFulfilled;
          if (fullfilled?.data?.id) {
            // passimistic update for getalltask status update start
            dispatch(
              Api.util.updateQueryData("getAllTask", undefined, (draft) => {
                const selectedTask = draft?.find((task) => task.id == id);
                selectedTask.status = fullfilled?.data?.status;
              })
            );
            // passimistic update for getalltask status update end
          }
        } catch (e) {}
      },
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      onQueryStarted : async(id , {queryFulfilled , dispatch})=>{
        //optimistically update start

        const updateList = dispatch(Api.util.updateQueryData('getAllTask',undefined,(draft)=>{
          const data =  draft?.filter(task => task.id != id);
          return data
        }))

        //optimistically update end
        try {
         const result  = await queryFulfilled;
        
        }catch(e){
            updateList.undo()
        }
      }
    }),
  }),
});

export const { useEditStatusMutation , useDeleteTaskMutation } = TaskApi;
export default TaskApi;
