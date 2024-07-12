import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';
// import { BASE_URL } from '..';


const Login = () => {

  useEffect(()=>{
    document.getElementById("username").value=''
  },[])
  

  // const BASE_URL = process.env.REACT_APP_API_URL;
  // console.log(`${BASE_URL}/api/v1/user/login`)

  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${ process.env.REACT_APP_API_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      // console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      // console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
  }

  const autoLogin=async(e)=>{

    
   
    setUser({
      username:process.env.REACT_APP_GUEST_USERNAME,
      password:process.env.REACT_APP_GUEST_PASSWORD
    })

    // console.log(user)

    try{
      const res = await axios.post(`${ process.env.REACT_APP_API_URL}/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      navigate("/");
      // console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      // toast.error(error.response.data.message);
      // console.log(error);
    }
    setUser({
      username: "",
      password: ""
    })
   
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 '>
        <h1 className='text-3xl font-bold text-center text-white'>Login</h1>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Username</span>
            </label>
            <input
              value={user.username}
              id="username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10'
              type="text"
              autoComplete="off"
              placeholder='Username' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-white'>Password</span>
            </label>
            <input
              value={user.password}
              autoComplete="new-password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10'
              type="password"
              placeholder='Password' />
          </div>
          <p className='text-center my-2 text-white'>Don't have an account? <Link to="/signup"> signup </Link></p>
          <div>
            <button type="submit" className='btn btn-block btn-sm mt-2 border border-slate-700'>Login</button>
          </div>
          <div>
            <button  onClick={autoLogin} className=' w-full rounded-lg text-center mx-auto p-1 mt-3 bg-red-500 text-white '>Login Using Guest Credentials</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login