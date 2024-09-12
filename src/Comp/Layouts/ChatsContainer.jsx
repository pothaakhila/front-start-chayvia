import React, { useState, useEffect } from 'react';
import ChatMenu from './Chats'; // Import the ChatMenu component

const ChatsContainer = () => {
    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        // Fetch chat data from an API or other source
        fetch('/api/chats')
            .then((response) => response.json())
            .then((data) => setChatList(data))
            .catch((error) => console.error('Error fetching chat data:', error));
    }, []);

    return (
        <div>
            <h1>Chats</h1>
            <ChatMenu chatList={chatList} />
        </div>
    );
};

export default ChatsContainer;
