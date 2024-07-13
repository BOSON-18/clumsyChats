import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
    const { messages } = useSelector(store => store.message);

    // Add console log to inspect messages
    console.log('Messages:', messages);

    // Ensure messages is an array and filter out invalid messages
    const safeMessages = Array.isArray(messages) ? messages.filter(message => message && message._id) : [];

    // Return null or a loading indicator if safeMessages is empty
    if (safeMessages.length < 1) return null;

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
