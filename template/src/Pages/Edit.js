import { useParams } from "react-router-dom";
import Nav from "../Component/Nav/Nav";
import EditTask from "../Component/Edit/EditTask";

export default function Edit() {
  const { taskId } = useParams();

  return (
    <>
      <Nav />
      <EditTask id={taskId}/>
    </>
  );
}
