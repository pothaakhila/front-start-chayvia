import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import MessagesPage from "./MessagesPage";
import { toast } from "react-toastify";
import UserProfileCard from './UserProfileCard'; // Import the UserProfileSidebar component
import MenuPage from './MenuPage'
import Accordion from "react-bootstrap/Accordion";
const ChatBox = ({ chatBox, setChatBox, theme, chatUser, conversationId, user,  
  }) => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [con, setCon] = useState("");
  const [isPicker, setIsPicker] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [callType, setCallType] = useState('voice');
  const [showProfileCard, setShowProfileCard] = useState(false); // State to control the profile card

  const containerRef = useRef(null);
  const fileAttachRef = useRef(null);
  const imageAttachRef = useRef(null);
 
  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;

      try {
        const { data } = await axios.post("http://localhost:3030/getmessages", {
          conversationId,
        });
        setMessages(data);
        setFilteredMessages(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching messages");
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000);
    return () => clearInterval(interval);
  }, [conversationId]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setFilteredMessages(
        messages.filter((message) =>
          message.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredMessages(messages);
    }
  }, [searchQuery, messages]);

  useEffect(() => {
    if (!isUserScrolling) {
      const container = containerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [filteredMessages, isUserScrolling]);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const isAtBottom =
        container.scrollHeight - container.scrollTop === container.clientHeight;
      setIsUserScrolling(!isAtBottom);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const uploadAttachment = async (attachment) => {
    try {
      const formData = new FormData();
      formData.append("attachment", attachment);

      const { data } = await axios.post("http://localhost:3030/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data.fileUrl; // Ensure the server returns the file URL
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading attachment");
      return null;
    }
  };

  const handleMessage = async (e) => {
    e.preventDefault();
    setIsPicker(false);

    if (!con.trim() && !file && !image) {
      toast.error("Message content or attachment is required");
      return;
    }

    try {
      let fileUrl = null;
      let imageUrl = null;

      if (file) {
        fileUrl = await uploadAttachment(file);
      }

      if (image) {
        imageUrl = await uploadAttachment(image);
      }

      await axios.post("http://localhost:3030/sendmessage", {
        content: con.trim(),
        sender: user._id,
        conversationId,
        fileUrl,
        imageUrl,
      });

      setCon("");
      setFile(null);
      setImage(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending message");
    }
  };

  const handleFileAttach = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImageAttach = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSearchToggle = () => {
    setIsSearchVisible(!isSearchVisible);
    if (!isSearchVisible) {
      setSearchQuery(""); // Clear search query when showing the search bar
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCall = async (type) => {
    setCallType(type);
    setShowCallModal(true); // Open the call modal

    try {
      await axios.post("http://localhost:3030/startCall", {
        caller: user._id,
        receiver: chatUser._id,
        type,
        conversationId,
      });
      toast.success("Call initiated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error initiating call");
    }
  };

  const handleCallClose = async () => {
    setShowCallModal(false);

    try {
      await axios.post("http://localhost:3030/endCall", {
        caller: user._id,
        receiver: chatUser._id,
        conversationId,
      });
      toast.success("Call ended");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error ending call");
    }
  };
  const [showSidebar, setShowSidebar] = useState(false);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleCloseSidebar = () => {
    setShowSidebar(false);
  };
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Function to toggle profile visibility
  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const farray = [
    { name: "File1.zip", size: "12.5 MB" },
    { name: "File2.jpg", size: "3.5 MB" },
  ];

  // Function to close the profile
  const onClose = () => {
    setIsProfileOpen(false);
  };
  const profilePhotoUrl = user?.profile_photo_url || 'default_photo_url';
  return (
    <div className="layout-wrapper d-lg-flex">
      <div className="user-chat w-100 overflow-hidden">
    <div className='d-lg-flex' >
      <div className='w-70 overflow-hidden position-relative'>
    <div
      id="chatbox"
      className="chat-box"
      style={{
        left: chatBox,
        color: theme ? "#eff2f7" : "#343a40",
        backgroundColor: theme ? "#262e35" : "#ffffff",
        display: chatBox === "100vw" ? "none" : "block",
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          borderBottom: `1px solid ${theme ? "#36404a" : "#f0eff5"}`,
        }}
        className="p-4 d-flex justify-content-between align-items-center"
      >
        <div className="d-flex justify-content-center align-items-center">
          <button
            className="back-btn"
            onClick={() => setChatBox("100vw")}
            style={{
              background: "transparent",
              border: "none",
              paddingRight: "6px",
              marginRight: "16px",
            }}
          >
            <i
              className="ri-arrow-left-line"
              style={{
                color: theme ? "white" : "black",
                fontSize: "30px",
              }}
            ></i>
          </button>
          <img
            className="rounded-circle"
            style={{ width: "35.19px", height: "35.19px", marginRight: "16px" }}
            src={chatUser?.profile_photo_url}
            alt={chatUser?.name || "Chat User"}
            onClick={() => setShowProfileCard(!showProfileCard)} // Toggle profile card visibility
          />
          <h5
            style={{
              fontSize: "16px",
              margin: "0",
              color: theme ? "#eff2f7" : "#343a40",
            }}
          >
            {chatUser?.name}   <i
            className="ri-record-circle-fill font-size-10 text-success me-1 d-inline-block"
            style={{ fontSize: "10px" }}
          ></i>
          </h5>
        </div>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ color: theme ? "#abb4d2" : "#7a7f9a" }}
        >
          <div
            onClick={handleSearchToggle}
            style={{ cursor: "pointer", marginRight: "30px" }}
          >
            <i className="ri-search-line" style={{ fontSize: "20px" }}></i>
          </div>
          <i
            className="ri-phone-line"
            style={{ marginRight: "30px", fontSize: "20px" }}
            onClick={() => handleCall('voice')}
          ></i>
          <i
            className="ri-vidicon-line"
            style={{ marginRight: "30px", fontSize: "20px" }}
            onClick={() => handleCall('video')}
          ></i>
         
         <li class="list-inline-item d-none d-lg-inline-block me-2 ms-0">
          <button type="button" class="nav-btn user-profile-show btn btn-none"  onClick={toggleProfile}>
            <i class="ri-user-2-line" style={{ color: theme ? "#abb4d2" : "#7a7f9a" ,paddingLeft:'2px'}}>
              </i></button>
              </li>
        
          <Dropdown style={{ backgroundColor: theme ? "#262e35" : "#fff" }}>
         
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="profile"
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: theme ? "#abb4d2" : "#7a7f9a",
              }}
            >
              <i
                className="ri-more-fill"
                style={{ marginRight: "5px", fontSize: "20px" }}
              ></i>
            </Dropdown.Toggle>
            <Dropdown.Menu style={{ backgroundColor: theme ? "#262e35" : "#fff" }}>
              <Dropdown.Item href="#/action-1" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}>Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}>Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}>Something else</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {isSearchVisible && (
        <div
          style={{
            width: "20%",
            position:'relative',
            top:'20px',
            left:'80px',
            border: `1px solid ${theme ? "#36404a" : "#f0eff5"}`,
            backgroundColor: theme ? "#262e35" : "#ffffff",
            padding: "10px",
          }}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: `1px solid ${theme ? "#36404a" : "#e0e0e0"}`,
              backgroundColor: theme ? "#36404a" : "#f9f9f9",
              color: theme ? "#eff2f7" : "#343a40",
            }}
          />
          {searchQuery && filteredMessages.length === 0 && (
            <p style={{ color: theme ? "#eff2f7" : "#343a40" }}>No results found</p>
          )}
        </div>
      )}
      <div
        className="chatbox-chat p-4"
        ref={containerRef}
        style={{ width: "100%", zIndex: 10, overflowY: "scroll" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
          }}
        >
          {filteredMessages.map((message) => (
            <MessagesPage
              key={message._id}
              content={message.content}
              left={message.sender === chatUser._id}
              sentAt={message.createdAt}
              theme={theme}
              user={user}
              chatUser={chatUser}
              fileUrl={message.fileUrl}
              imageUrl={message.imageUrl}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          borderTop: `1px solid ${theme ? "#36404a" : "#f0eff5"}`,
          position: "absolute",
          bottom: "0",
        }}
        className="p-4"
      >
        <form
          onSubmit={handleMessage}
          className="d-flex justify-content-between align-items-center"
        >
          <input
            type="text"
            className={`form-control form-control-lg ${
              theme ? "phColorDark" : "phColorLight"
            }`}
            placeholder="Enter Message..."
            style={{
              backgroundColor: theme ? "#36404a" : "#e6ebf5",
              fontSize: "16px",
              border: "none",
            }}
            value={con}
            onChange={(e) => setCon(e.target.value)}
          />
          <div className="d-flex justify-content-center align-items-center">
            <div style={{ position: "relative" }}>
              {isPicker && (
                <div
                  style={{
                    position: "absolute",
                    marginTop: "-470px",
                    marginLeft: "-320px",
                    backgroundColor: "white",
                    zIndex: 10
                  }}
                >
                  <EmojiPicker
                    onEmojiClick={(emoji) => setCon(con + emoji.emoji)}
                  />
                </div>
              )}
              <div
                onClick={() => setIsPicker(!isPicker)}
                style={{ cursor: "pointer" }}
              >
                <i
                  className="ri-emotion-happy-line"
                  style={{
                    marginRight: "30px",
                    fontSize: "20px",
                    marginLeft: "16px",
                    color: "#7269ef",
                  }}
                ></i>
              </div>
            </div>
            <div onClick={() => fileAttachRef.current.click()}>
              <input
                type="file"
                ref={fileAttachRef}
                name="attachment"
                id="attachment"
                style={{ display: "none" }}
                onChange={handleFileAttach}
              />
              <i
                className="ri-attachment-line"
                style={{
                  marginRight: "35px",
                  fontSize: "20px",
                  color: "#7269ef",
                }}
              ></i>
            </div>
            <div onClick={() => imageAttachRef.current.click()}>
              <input
                type="file"
                ref={imageAttachRef}
                name="attachment"
                id="attachment"
                style={{ display: "none" }}
                onChange={handleImageAttach}
              />
              <i
                className="ri-image-fill"
                style={{
                  marginRight: "20px",
                  fontSize: "20px",
                  color: "#7269ef",
                }}
              ></i>
            </div>
            <button
              type="submit"
              style={{
                padding: "9px 17px",
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#7269ef",
              }}
            >
              <i
                className="ri-send-plane-2-line"
                style={{ fontSize: "18px", color: "white" }}
              ></i>
            </button>
          </div>
        </form>
      </div>

      {/* Profile Modal */}
      <Modal show={showProfileCard} onHide={() => setShowProfileCard(false)} centered>
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center p-4">
              <div className="avatar-lg mx-auto mb-4">
                <img
                  src={chatUser?.profile_photo_url}
                  alt={chatUser?.name}
                  className="img-thumbnail rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <h5 className="text-truncate">{chatUser?.name}</h5>
              <p className="text-muted">{chatUser?.about || "No information available"}</p>
              {/* Add any additional profile information or attachments here */}
              {/* Example for attachments */}
              {chatUser?.attachments && chatUser.attachments.length > 0 && (
                <div>
                  <h6>Attachments:</h6>
                  <ul>
                    {chatUser.attachments.map((attachment, index) => (
                      <li key={index}>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer">
                          {attachment.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* Call Modal */}
      <Modal show={showCallModal} onHide={handleCallClose} centered>
        <div className="modal-content">
          <div className="modal-body">
            <div className="text-center p-4">
              <div className="avatar-lg mx-auto mb-4">
                <img
                  src={chatUser?.profile_photo_url}
                  alt={chatUser?.name}
                  className="img-thumbnail rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <h5 className="text-truncate">{chatUser?.name}</h5>
              <p className="text-muted">
                Start {callType === 'voice' ? 'Audio Call' : 'Video Call'}
              </p>
              <div className="mt-5">
                <ul className="list-inline mb-1">
                  <li className="list-inline-item px-2 me-2 ms-0">
                    <Button
                      variant="danger"
                      className="avatar-sm rounded-circle"
                      onClick={handleCallClose}
                    >
                      <span className="avatar-title bg-transparent font-size-20">
                        <i className="ri-close-fill"></i>
                      </span>
                    </Button>
                  </li>
                  <li className="list-inline-item px-2">
                    <Button
                      variant="success"
                      className="avatar-sm rounded-circle"
                      onClick={() => handleCall(callType)}
                    >
                      <span className="avatar-title bg-transparent font-size-20">
                        <i className={`ri-${callType === 'voice' ? 'phone-fill' : 'vidicon-fill'}`}></i>
                      </span>
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
    </div>
    {isProfileOpen && (


         <div className="user-profile-sidebar "   style={{ backgroundColor: theme ? "#262e35" : "#fff" }}>
      <div className="px-3 px-lg-4 pt-3 pt-lg-4">
        <div className="user-chat-nav text-end"  style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}>
          <Button type="button" id="user-profile-hide" className="nav-btn btn btn-none" onClick={onClose}>
            <i className="ri-close-line"></i>
          </Button>
        </div>
      </div>

      {/* User Details */}
      <div className="text-center p-4 border-bottom">
        <div className="mb-4 d-flex justify-content-center" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}>
          {user && user.profile_photo_url ? (
            <img   src={chatUser.profile_photo_url} className="rounded-circle avatar-lg img-thumbnail" alt={user.name} />
          ) : (
            <div className="rounded-circle avatar-lg img-thumbnail">No Image</div>
          )}
        </div>
        <h5 className="font-size-16 mb-1 text-truncate" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}>{chatUser?.name || "Unknown User"}</h5>
        <p className="text-muted text-truncate mb-1" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}>
       
         <h6  style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}>   <i className="ri-record-circle-fill font-size-10 text-success me-1" ></i>Active</h6> 
        </p>
      </div>

      {/* Profile Details */}
      <div className="p-4 user-profile-desc" style={{ maxHeight: '100%' }}>
        <div className="text-muted" >
          <p className="mb-4" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}>"If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual."</p>
        </div>
        <div style={{height:'350px'}}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header
                style={{ backgroundColor: theme ? "#a6b0cf08" : "#49505708" }}
              >
                <h5
                  style={{
                    color: theme ? "#eff2f7" : "#000000",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  <i
                    className="ri-user-2-line"
                    style={{
                      marginRight: "10px",
                      fontWeight: "900",
                      fontSize: "14px",
                    }}
                  ></i>
                  About
                </h5>
              </Accordion.Header>
              <Accordion.Body
                style={{ backgroundColor: theme ? "#262e35" : "#fff" }}
              >
                <div>
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Name
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    {chatUser.name}
                  </h5>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Email
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    {user.email}
                  </h5>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Time
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    11:40 AM
                  </h5>
                </div>
                <div className="mt-4">
                  <p
                    className="mb-1"
                    style={{
                      color: theme ? "#abb4d2" : "#7a7f9a",
                      fontSize: "15px",
                    }}
                  >
                    Location
                  </p>
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#343a40",
                      fontSize: "14px",
                    }}
                    className="mb-2"
                  >
                    Hyderabad, IND
                  </h5>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header
                style={{ backgroundColor: theme ? "#a6b0cf08" : "#49505708" }}
              >
                <h5
                  style={{
                    color: theme ? "#eff2f7" : "#000000",
                    fontSize: "14px",
                    margin: "0",
                  }}
                >
                  <i
                    className="ri-attachment-line"
                    style={{
                      marginRight: "10px",
                      fontWeight: "900",
                      fontSize: "14px",
                    }}
                  ></i>
                  Attached Files
                </h5>
              </Accordion.Header>
              <Accordion.Body
                style={{ backgroundColor: theme ? "#262e35" : "#fff" }}
              >
                <div>
                  {farray.map((farr, index) => {
                    return (
                      <div
                        key={index}
                        className="p-2 d-flex"
                        style={{
                          marginBottom: "8px",
                          border: "1px solid" + (theme ? "#36404a" : "#f0eff5"),
                        }}
                      >
                        <div
                          className="align-items-center d-flex justify-content-center rounded"
                          style={{
                            width: "48px",
                            height: "48px",
                            backgroundColor: theme
                              ? "rgb(114 105 239 / 15%)"
                              : "#e3e1fc",
                            fontSize: "20px",
                            marginRight: "16px",
                          }}
                        >
                          <i
                            className="ri-file-text-fill"
                            style={{ color: "#7269EF" }}
                          ></i>
                        </div>
                        <div style={{ width: "50%" }}>
                          <h5
                            style={{
                              fontSize: "14px",
                              marginBottom: "4px",
                              color: theme ? "#eff2f7" : "#343a40",
                              fontWeight: "500",
                            }}
                          >
                            {farr.name}
                          </h5>
                          <p
                            style={{
                              fontSize: "13px",
                              marginBottom: "0",
                              color: theme ? "#abb4d2" : "#7a7f9a",
                            }}
                          >
                            {farr.size}
                          </p>
                        </div>
                        <div className="ms-4" style={{ width: "60px" }}>
                          <ul
                            className="list-inline d-flex align-items-center justify-content-between mb-0 mt-2"
                            style={{ fontSize: "18px" }}
                          >
                            <li className="list-inline-item mr-2" key={index}>
                              <i
                                className="ri-download-2-line"
                                style={{ color: theme ? "#abb4d2" : "#7a7f9a" }}
                              ></i>
                            </li>

                            <li className="list-inline-item" key={index}>
                              <Dropdown>
                                <Dropdown.Toggle
                                  className="profile"
                                  style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                  }}
                                  variant="success"
                                  id="dropdown-basic"
                                >
                                  <i
                                    className="ri-more-fill"
                                    style={{
                                      color: theme ? "#abb4d2" : "#7a7f9a",
                                    }}
                                  ></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                  <Dropdown.Item href="#/edit">Edit</Dropdown.Item>
                                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                  <Dropdown.Divider />
                                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
      )}
    
    </div>
    </div>
    </div>
  );
};

export default ChatBox;
