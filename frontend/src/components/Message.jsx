import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <div className="">
            <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Profile" src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto} />
                    </div>
                </div>
                <div className={`chat-bubble relative max-w-lg min-w-28 ${message?.senderId === authUser?._id ? 'bg-[#DCF8C6] ' : 'bg-gray-200 '} rounded-md shadow-md mb-4`}>
                    <div className="px-1 py-1">
                        <div className={`text-lg text-gray-700 ${message?.senderId === authUser?._id ? 'text-left' : 'text-left'}`}>
                            {message?.message}
                        </div>
                        <div className={`text-xs opacity-80 text-gray-500 ${message?.senderId === authUser?._id ? 'text-right' : 'text-right'}`}>
                            {message?.updatedAtIST?.substr(11, 5)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
