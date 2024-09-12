import React, { useState } from "react";
import ProfilePage from './ProfilePage';
import Chats from './Chats';
import ContactsPage from './ContactsPage';
import GroupsPage from './GroupsPage';
import SettingsPage from  './SettingsPage';
import UserProfileCard from "./UserProfileCard";
const MenuDesc = ({
  setChatBox,
  theme,
  isSelected,
  chatUser,
  setConversationId,
  setChatUser,
  user,
  users,
}) => {
  const [groupSelected, setGroupSelected] = useState("");

  return (
    <div
      id="middle"
      className="menudesc"
      style={{
        backgroundColor: theme ? "#303841" : "#f7f7ff",
        overflow: "hidden",
      }}
    >
      {isSelected === "My Profile" && (
        <ProfilePage isSelected={isSelected} theme={theme} user={user} />
      )}
      {isSelected === "Chats" && (
        <Chats
          isSelected={isSelected}
          theme={theme}
          chatUser={chatUser}
          users={users}
          setChatBox={(e) => setChatBox(e)}
          setChatUser={(e) => setChatUser(e)}
        />
      )}
      {isSelected === "Groups" && (
        <GroupsPage
          isSelected={isSelected}
          theme={theme}
          groupSelected={groupSelected}
          setGroupSelected={(e) => setGroupSelected(e)}
        />
      )}
      {isSelected === "Contacts" && (
        <ContactsPage
          isSelected={isSelected}
          theme={theme}
          user={user}
          users={users}
        />
      )}
      {isSelected === "Settings" && (
        <SettingsPage isSelected={isSelected} theme={theme} user={user} />
      )}
      {isSelected ==="chatp" && (
        <UserProfileCard isSelected={isSelected} theme={theme} user={user}/>
      )}
    </div>
  );
};

export default MenuDesc;
