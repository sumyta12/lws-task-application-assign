import React, { useEffect, useState } from "react";
import { useGetProjectQuery } from "../../Feature/GetTask/GetTaskApi";
import { useDispatch } from "react-redux";
import { filterTask } from "../../Feature/Filter/FilterTask";

export default function Project() {
  const {
    data: projectList,
    isLoading,
    isError,
    error,
  } = useGetProjectQuery() || {};

  const [checkcer, setChecker] = useState([
    "Scoreboard",
    "Flight Booking",
    "Product Cart",
    "Book Store",
    "Book Store",
    "Blog Application",
    "Job Finder",
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    //it will listen the checker has change the value or not
    dispatch(filterTask(checkcer));
  }, [checkcer, dispatch]);

  const handlerProjectSelect = (name) => {
    if (checkcer.includes(name)) {
      setChecker((prev) => {
        return prev.filter((check) => check !== name);
      });
    } else {
      setChecker((prev) => {
        return [...prev, name];
      });
    }
  };

  let content = null;

  if (isLoading) {
    content = <h1>The Project Data is Comming Soon ...</h1>;
  }

  if (!isLoading && isError) {
    content = <h1>Hey something gone wrong project{JSON.stringify(error)}</h1>;
  }

  if (!isLoading && projectList?.length === 0) {
    content = <h1>No Team Member Avaiable</h1>;
  }

  if (!isLoading && projectList?.length > 0) {
    content = projectList?.map((project) => {
      const { id, projectName, colorClass } = project || {};

      return (
        <div className="checkbox-container" key={id}>
          <input
            type="checkbox"
            className={colorClass}
            checked={checkcer.includes(projectName)}
            onChange={() => handlerProjectSelect(projectName)}
          />
          <p className="label">{projectName}</p>
        </div>
      );
    });
  }

  return (
    <div>
      <h3 className="text-xl font-bold">Projects</h3>

      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
