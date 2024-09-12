import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarPage from "./SidbarPage";
import axios from "axios";
import { toast } from "react-toastify";
import MenuPage from "./MenuPage";
import ChatPage from "./ChatPage";

const Dashboard = ({ user, setUser }) => {
  const [isSelected, setIsSelected] = useState("Chats");
  const [chatUser, setChatUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [theme, setTheme] = useState(false);
  const [chatBox, setChatBox] = useState("0");
  const [conversationId, setConversationId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("http://localhost:3030/users");
        const filteredUsers = data.filter(({ _id }) => _id !== user._id);
        setUsers(filteredUsers);
        setChatUser(filteredUsers[0] || null);
      } catch (error) {
        toast.error("Error fetching users");
      }
    };

    fetchUsers();
  }, [user, navigate]);

  useEffect(() => {
    // if (!user) navigate("/");
    if (!chatUser) return;

    const fetchConversationId = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3030/getconversationid",
          {
            currentUser: user._id,
            chatUser: chatUser._id,
          }
        );
        setConversationId(data._id);
      } catch (error) {
        if (error.response?.status === 410) {
          try {
            const { data } = await axios.post(
              "http://localhost:3030/setconversationid",
              {
                currentUser: user._id,
                chatUser: chatUser._id,
              }
            );
            setConversationId(data._id);
          } catch (error) {
            toast.error(
              error.response?.data?.message || "Error setting conversation ID"
            );
          }
        } else {
          toast.error(error.response?.data || "Error fetching conversation ID");
        }
      }
    };

    fetchConversationId();
  }, [chatUser, user]);

  return (
    <div
      className="conta"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: theme ? "#303841" : "#f1f1ff",
      }}
    >
      <SidebarPage
        setThemee={() => setTheme((prevTheme) => !prevTheme)}
        theme={theme}
        isSelected={isSelected}
        user={user}
        setUser={setUser}
        setIsSelected={setIsSelected}
      />

      <MenuPage
        chatUser={chatUser}
        setChatUser={setChatUser}
        setChatBox={setChatBox}
        theme={theme}
        user={user}
        setConversationId={setConversationId}
        users={users}
        isSelected={isSelected}
      />

      <ChatPage
        chatBox={chatBox}
        setChatBox={setChatBox}
        theme={theme}
        conversationId={conversationId}
        user={user}
        chatUser={chatUser}
      />
    
    </div>
  );
};

export default Dashboard;
