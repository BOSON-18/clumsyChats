import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);

    // Add console log to inspect messages
    console.log('Messages:', messages);

    // Ensure messages is an array
    // if(messages?._id===undefined || messages?._id===null){

    // }
    messages?.filter(message => message?._id !== undefined && message?._id !== null);
    // if(messages.length<1)
    const safeMessages = Array.isArray(messages) ? messages : [];

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
                safeMessages?.map((message) => {
                    return (
                        <Message key={message?._id} message={message} />
                    )
                })
            }
        </div>
    )
}

export default Messages
