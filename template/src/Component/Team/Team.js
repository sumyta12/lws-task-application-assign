import { useGetTeamMemberQuery } from "../../Feature/GetTask/GetTaskApi";

export default function Team() {

  const {
    data: teamMember,
    isLoading,
    isError,
    error,
  } = useGetTeamMemberQuery() || {};

  let content = null;

  if (isLoading) {
    content = <h1>The Team Member Data is Comming Soon ...</h1>;
  }

  if (!isLoading && isError) {
    content = <h1>Hey something gone wrong {JSON.stringify(error)}</h1>;
  }

  if (!isLoading && teamMember?.length === 0) {
    content = <h1>No Team Member Avaiable</h1>;
  }

  if (!isLoading && teamMember?.length > 0) {
    content = teamMember?.map((member) => {
      const { name, id, avatar } = member || {};
      
      return (
        <div className="checkbox-container" key={id}>
          <img src={avatar} className="team-avater" alt="name of team member" />
          <p className="label">{name}</p>
        </div>
      );
    });
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold">Team Members</h3>
      <div className="mt-3 space-y-4">{content}</div>
    </div>
  );
}
