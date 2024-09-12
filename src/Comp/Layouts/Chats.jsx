import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import axios from "axios"; // Make sure to import axios
import toast from "react"; // Make sure to import toast
import MessagesPage from "./MessagesPage"; // Import your MessagesPage component

const ChatMenu = ({
  isSelected,
  theme,
  chatUser,
  setChatUser,
  setChatBox,
  users,
  sentAt,
  conversationId
}) => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const sentDate = new Date(sentAt);

  const handleChat = async (ar) => {
    setChatUser(ar);
    setChatBox("0");
  };

  const items = users.map((arr) => {
    return (
      <div
        key={arr._id} // Added key for list items
        className=""
        style={{
          width: "71px",
          height: "88px",
        }}
      >
        <div
          className="text-center"
          style={{
            height: "51px",
            marginTop: "30px",
            borderRadius: "7px",
            backgroundColor: theme ? "#36404a" : "#e6ebf5",
          }}
        >
          <a
            href="/dashboard"
            className="text-center"
            style={{
              marginTop: "px !important",
              padding: "8px",
              width: "71px",
              height: "51px",
              textDecoration: "none",
              color: theme ? "#eff2f7" : "#000000",
            }}
          >
            <div
              className="rounded-circle"
              style={{
                margin: "-25px 18px 0px 18px",
                display: "block",
                zIndex: "9",
              }}
            >
              <img
                src={arr.profile_photo_url}
                alt={arr.name}
                className="image-fluid rounded-circle"
                style={{
                  width: "35.19px",
                  height: "35.19px",
                  margin: "-16px 0 0 0",
                }}
              />{" "}
            </div>
            <p style={{ fontSize: "16px", fontWeight: "500" }}>
              {arr.name.split(" ")[0]}
            </p>
          </a>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="px-4 pt-4">
        <h4
          className="mb-4"
          style={{
            fontSize: "calc(1.25625rem + .075vw)",
            color: theme ? "#eff2f7" : "#000000",
          }}
        >
          {isSelected}
        </h4>
        <div className="d-flex">
          <span
            className={theme ? "phColorDark" : "phColorLight"}
            style={{
              padding: "8px 4px 8px 16px",
              fontSize: "18px",
              borderTopLeftRadius: "3px",
              borderBottomLeftRadius: "3px",
              backgroundColor: theme ? "#36404a" : "#e6ebf5",
            }}
          >
            <i className="ri-search-line"></i>
          </span>
          <input
            type="search"
            name="chat-search"
            id={theme ? "csearchPhDark" : "csearchPhLight"}
            placeholder="Search messages or users"
            className={
              "form-control " + (theme ? "phColorDark" : "phColorLight")
            }
            style={{
              border: "none",
              borderTopRightRadius: "3px",
              borderBottomRightRadius: "3px",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              backgroundColor: theme ? "#36404a" : "#e6ebf5",
              height: "45px",
              padding: "6px 16px",
              fontWeight: "400",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="px-4 pb-4">
        <AliceCarousel
          mouseTracking={true}
          items={items}
          disableButtonsControls
          disableDotsControls
          disableSlideInfo
          autoHeight
          autoWidth
          controlsStrategy="responsive"
          touchTracking={false}
          activeIndex={0}
          swipeDelta={50}
          keyboardNavigation={true}
          swipeExtraPadding={200}
          touchMoveDefaultEvents={true}
        />
      </div>
      <div>
        <h5
          className="mb-3 px-3"
          style={{
            fontSize: "16px",
            color: theme ? "#eff2f7" : "#000000",
            letterSpacing: "0.5px",
          }}
        >
          Recent
        </h5>
        <div
          className="px-2"
          style={{
            overflowY: "auto",
            height: "70vh",
          }}
        >
          {users.map((ar) => {
            return (
              <div
                key={ar._id} // Added key for list items
                onClick={() => handleChat(ar)}
                className="d-flex"
                style={{
                  padding: "15px 20px",
                  backgroundColor:
                    chatUser._id === ar._id
                      ? theme
                        ? "#36404a"
                        : "#e6ebf5"
                      : "",
                }}
              >
                <div className="align-items-center d-flex">
                  <img
                    className="rounded-circle"
                    src={ar.profile_photo_url}
                    alt={ar.name}
                    style={{ width: "35.19px", height: "35.19px" }}
                  />
                </div>
                <div
                  style={{
                    width: "calc(90% - 35.19px - 16px)",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "18px",
                      marginLeft: "16px",
                      marginBottom: "4px",
                      color: theme ? "#eff2f7" : "#343a40",
                    }}
                  >
                    {ar.name}
                  </h5>
                  <p
                    style={{
                      fontSize: "16px",
                      marginLeft: "16px",
                      marginBottom: "0",
                      color: theme ? "#abb4d2" : "#7a7f9a",
                    }}
                  >
                    helo
                    {ar.name}
                  </p>
                </div>
                <div
                  className=""
                  style={{
                    width: "15%",
                    position: "relative",
                    fontSize: "14px",
                    color: theme ? "#abb4d2" : "#7a7f9a",
                  }}
                >
                  {/*{sentDate.getHours(43) + ':' + sentDate.getMinutes()}*/}
                  6:32
                
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatMenu;
