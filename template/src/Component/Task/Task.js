import { useGetAllTaskQuery } from "../../Feature/GetTask/GetTaskApi";
import moment from "moment";
import {
  useDeleteTaskMutation,
  useEditStatusMutation,
} from "../../Feature/Task/TaskApi";
import { statusCheckButton } from "./TaskStatusChangeButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Task() {
  //filter task
  const { filterarr, search } = useSelector((state) => state.filter) || {};

  const {
    data: TaskList,
    isError,
    isLoading,
    error,
  } = useGetAllTaskQuery() || {};

  //Status : status update
  const [editStatus, { isError: editStatusError }] = useEditStatusMutation();

  const handlerStatusChange = ({ id, status }) => {
    editStatus({ id, status });
  };

  //Delete : delete the current id
  const [deleteTask, { isError: deleteStatusError }] = useDeleteTaskMutation();

  const handlerButton = (id) => {
    deleteTask(id);
  };

  const navigation = useNavigate();

  // click to go other page
  const handleredit = (id) => {
    navigation(`/edit/${id}`);
  };

  let content = null;

  if (isLoading) {
    content = <h1>The Task Data is Comming Soon ...</h1>;
  }

  if (!isLoading && isError) {
    content = <h1>Hey something gone wrong {JSON.stringify(error)}</h1>;
  }

  if (!isLoading && TaskList?.length === 0) {
    content = <h1>No Task Avaiable</h1>;
  }

  if (!isLoading && TaskList?.length > 0) {
    content = TaskList?.filter((item) => {
      if (filterarr?.includes(item.project.projectName)) {
        return true;
      }
      return false;
    })
      .filter((item) => {
        if (search === "") {
          return true;
        } else if (item.taskName.toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
        return false;
      })
      .map((task) => {
        const { taskName, teamMember, deadline, project, id, status } =
          task || {};

        const { name, avatar } = teamMember || {};

        const { projectName, colorClass } = project || {};

        const date = moment(deadline)
          .format("LL")
          .split(/[\s,]+/)[1];
        const month = moment(deadline).format("LL").split(" ")[0];

        const button = statusCheckButton(
          status,
          handlerButton,
          handleredit,
          id
        );

        return (
          <div className="lws-task" key={id}>
            <div className="flex items-center gap-2 text-slate">
              <h2 className="lws-date">{date}</h2>
              <h4 className="lws-month">{month}</h4>
            </div>

            <div className="lws-taskContainer">
              <h1 className="lws-task-title">{taskName}</h1>
              <span className={`lws-task-badge ${colorClass}`}>
                {projectName}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={avatar}
                  alt={`name of the team member ${name}`}
                  className="team-avater"
                />
                <p className="lws-task-assignedOn">{name}</p>
              </div>

              {button}

              <select
                className="lws-status"
                value={status}
                onChange={(e) =>
                  handlerStatusChange({ id, status: e.target.value })
                }>
                <option value="pending">Pending</option>
                <option value="inProgress">In Progress</option>
                <option value="complete">Completed</option>
              </select>
            </div>
          </div>
        );
      });
  }

  return (
    <div className="lws-task-list">
      {content}

      {editStatusError && <span>The status is not updating</span>}
      {deleteStatusError && <span>The id is not deleting</span>}
    </div>
  );
}
