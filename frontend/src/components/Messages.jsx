import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);
    const { selectedUser, authUser } = useSelector(store => store.user);

    // Add console log to inspect messages, selectedUser, and authUser
    // console.log('Messages:', messages);
    // console.log('Selected User:', selectedUser);
    // console.log('Auth User:', authUser);

    // Ensure messages is an array and filter out invalid messages
    const safeMessages = Array.isArray(messages) 
        ? messages.filter(message => message && message._id && 
            ((message.receiverId === selectedUser._id && message.senderId === authUser._id) || 
             (message.receiverId === authUser._id && message.senderId === selectedUser._id)))
        : [];

    // Return a loading indicator or a message indicating no messages are available if safeMessages is empty
    if (safeMessages.length < 1) return <div className='px-4 flex-1 overflow-auto'>No messages available</div>;

    return (
        <div className='px-4 flex-1 overflow-auto'>
            {
                safeMessages.map((message) => {
                    return (
                        <Message key={message._id} message={message} />
                    );
                })
            }
        </div>
    );
};

export default Messages;
