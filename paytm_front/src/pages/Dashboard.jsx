import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
// import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div className=" gap-2">
      <Appbar></Appbar>
      <div className="px-5">
        <Balance value={"10,000"}></Balance>
        <Users></Users>
      </div>
    </div>
  );
};
