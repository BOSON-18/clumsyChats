import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import MessageContainer from './MessageContainer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className="flex  md:flex-row h-screen w-screen rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div className="bg-gray-400 bg-opacity-25 backdrop-filter backdrop-blur-lg h-screen md:w-1/4 ">
        <Sidebar />
      </div>
      
      {/* Message Container */}
     
        <MessageContainer />
      
    </div>
  );
}

export default HomePage;
