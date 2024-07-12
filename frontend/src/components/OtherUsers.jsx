import React, { useEffect } from "react";
import OtherUser from "./OtherUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

const OtherUsers = ({ list, setList }) => {
  const { otherUsers } = useSelector((store) => store.user);

//   console.log("Printing received List", list[0]);
  // my custom hook
  useGetOtherUsers();
//   console.log("Prinitng other users", otherUsers);
  if (!otherUsers) return; // early return in react
  // const render = list===null?otherUsers:list[0]

  // console.log(render)

  return (
    <div className="overflow-auto flex-1">
       {list && list[0] ? (
        list[0]?.map((user) => <OtherUser key={user._id} user={user} />)
      ) : (
        otherUsers.map((user) => <OtherUser key={user._id} user={user} />)
      )}
    </div>
  );
};

export default OtherUsers;
