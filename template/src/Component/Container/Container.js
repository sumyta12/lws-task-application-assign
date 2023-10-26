import React from "react";
import Project from "../Project/Project";
import Team from "../Team/Team";
import Task from "../Task/Task";
import AddNew from "../AddNew/AddNew";

export default function Container() {
  return (
    <div className="container relative">
      <div className="sidebar">
        <Project />

        <Team />
      </div>

      <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
        <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
          <AddNew />
          
          <Task />
        </main>
      </div>
    </div>
  );
}
