import React, { useEffect, useRef, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from "./OtherUsers";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  setAuthUser,
  setOtherUsers,
  setSelectedUser,
} from "../redux/userSlice";
import { setMessages } from "../redux/messageSlice";

const Sidebar = () => {
//   const [search, setSearch] = useState("");
  const search=useRef("")
  const { otherUsers } = useSelector((store) => store.user);
  const [list, setList] = useState([otherUsers]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
// console.log(list)
  // useEffect(() => {
  //     const fetchAllUsers = async () => {
  //         axios.defaults.withCredentials = true;
  //         const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user`);
  //         setAllOtherUsers(res.data);
  //         dispatch(setOtherUsers(res.data));
  //     };

  //     fetchAllUsers();
  // }, [dispatch]);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/user/logout`
      );
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
      dispatch(setMessages(null));
      dispatch(setOtherUsers(null));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error);
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const trimmedSearch = search.current.value.toLowerCase().trim();
    
    if (trimmedSearch.length > 1) {
      const conversationUsers = otherUsers.filter((user) =>
        user.fullName.toLowerCase().includes(trimmedSearch) ||
        user.username.toLowerCase().includes(trimmedSearch)
      );

    //   console.log(conversationUsers)
  
      if (conversationUsers && conversationUsers.length > 0) {
        setList([conversationUsers]);
      } else {
        setList([otherUsers]);
        toast.error("User not found!");
      }
    } else {
      setList([otherUsers]);
    }
  }
  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-screen">
      <form
        onSubmit={searchSubmitHandler}
        action=""
        className="flex items-center gap-2"
      >
        <input
          ref={search}
        //   onChange={(e) => setSearch(e.target.value)}
        onChange={searchSubmitHandler}
          className="input input-bordered rounded-md w-full"
          type="text"
          placeholder="Search..."
        />
        {/* <button type="submit" className="btn bg-zinc-700 text-white">
          <BiSearchAlt2 className="w-6 h-6 outline-none" />
        </button> */}
      </form>
      <div className="divider px-3"></div>
      <OtherUsers list={list}  setList={setList}/>
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn w-full mx-auto">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
