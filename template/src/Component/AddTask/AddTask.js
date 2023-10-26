import {
  useGetProjectQuery,
  useGetTeamMemberQuery,
} from "../../Feature/GetTask/GetTaskApi";
import { useState } from "react";
import { useAddTaskMutation } from "../../Feature/TaskAddEdit/TaskAddEdit";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [addTasks, setaddTasks] = useState({
    taskName: "",
    teamMember: "",
    projectName: "",
    deadline: "",
  });

  const {
    data: projectList,
    isLoading: projectIsLoading,
    isError: projectIsError,
    error: projectError,
  } = useGetProjectQuery() || {};

  const {
    data: teamMember,
    isLoading: teamIsLoading,
    isError: teamIsError,
    error: teamError,
  } = useGetTeamMemberQuery() || {};

  let selectedProject = null;

  if (!projectIsLoading && projectList?.length > 0) {
    selectedProject = projectList.map(({ projectName, id }) => {
      return (
        <option key={id} value={projectName}>
          {projectName}
        </option>
      );
    });
  }

  let seletedTeamMember = null;

  if (!teamIsLoading && teamMember?.length > 0) {
    seletedTeamMember = teamMember?.map(({ id, name }) => {
      return (
        <option key={id} value={name}>
          {name}
        </option>
      );
    });
  }

  //ADD : add the new task
  const [addTask, { isError: addTaskerror, error: adderror }] =
    useAddTaskMutation();

  const navigation = useNavigate()  

  const handlerForm = (e) => {
    e.preventDefault();

    const teamMemberInfo = teamMember?.find(
      (member) => member.name === addTasks.teamMember
    );

    const projectInfo = projectList?.find(
      (project) => project.projectName === addTasks.projectName
    );

    const { taskName, deadline } = addTasks;

    const task = {
      taskName,
      teamMember: {
        ...teamMemberInfo,
      },
      project: {
        ...projectInfo,
      },
      deadline,
      status: "inProgress",
    };

    addTask(task);

    navigation(`/`)
  };

  return (
    <div className="container relative">
      <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
        <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
          Create Task for Your Team
        </h1>

        <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
          <form className="space-y-6" onSubmit={handlerForm}>
            <div className="fieldContainer">
              <label htmlFor="lws-taskName">Task Name</label>
              <input
                type="text"
                name="taskName"
                id="lws-taskName"
                required
                placeholder="Implement RTK Query"
                value={addTasks?.taskName || ""}
                onChange={(e) =>
                  setaddTasks({ ...addTasks, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="fieldContainer">
              <label>Assign To</label>
              <select
                name="teamMember"
                id="lws-teamMember"
                required
                value={addTasks?.teamMember || ""}
                onChange={(e) =>
                  setaddTasks({ ...addTasks, [e.target.name]: e.target.value })
                }>
                <option value="" hidden>
                  Select Job
                </option>
                {seletedTeamMember}
              </select>
            </div>
            <div className="fieldContainer">
              <label htmlFor="lws-projectName">Project Name</label>
              <select
                id="lws-projectName"
                name="projectName"
                required
                value={addTasks?.projectName || ""}
                onChange={(e) =>
                  setaddTasks({ ...addTasks, [e.target.name]: e.target.value })
                }>
                <option value="" hidden>
                  Select Project
                </option>
                {selectedProject}
              </select>
            </div>

            <div className="fieldContainer">
              <label htmlFor="lws-deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="lws-deadline"
                required
                value={addTasks?.deadline || ""}
                onChange={(e) =>
                  setaddTasks({ ...addTasks, [e.target.name]: e.target.value })
                }
              />
            </div>

            <div className="text-right">
              <button type="submit" className="lws-submit">
                Save
              </button>
            </div>
          </form>
          {addTaskerror && <span>{JSON.stringify(adderror)}</span>}
        </div>
      </main>
    </div>
  );
}
