import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import emailjs from 'emailjs-com';
import { v4 as uuidv4 } from 'uuid';

// Define your EmailJS service and template IDs
const SERVICE_ID = 'service_c4ck1l6';
const TEMPLATE_ID = 'template_5lu4cq8';
const USER_ID = 'qezNVdY9H0BL6y6BS';

const Contacts = ({ isSelected, theme, users, setUsers }) => {
  const [contacts, setContacts] = useState({});
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [newContactEmail, setNewContactEmail] = useState("");
  const [invitationMessage, setInvitationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [actionPosition, setActionPosition] = useState({ top: 0, left: 0 });

  // Update contacts based on users
  useEffect(() => {
    const groupedContacts = users.reduce((acc, user) => {
      const initial = user.name[0].toUpperCase();
      if (!acc[initial]) acc[initial] = [];
      acc[initial].push(user.name);
      return acc;
    }, {});
    setContacts(groupedContacts);
  }, [users]);

  // Check for query parameters when the component is mounted
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const newUserEmail = params.get("newUserEmail");
    const token = params.get("token");

    if (newUserEmail && token) {
      handleContactForm(newUserEmail, token);
    }
  }, []);

  const handleContactForm = (email, token) => {
    const storedToken = localStorage.getItem(`invitation-${email}`);
    if (storedToken === token) {
      addNewContact(email);
      localStorage.removeItem(`invitation-${email}`);
      alert('Contact added successfully!');
    } else {
      alert('Invalid or expired token.');
    }
  };

  const addNewContact = (email) => {
    const newUser = { name: email.split('@')[0] };
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleInviteSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Generate a unique token and link
      const uniqueToken = uuidv4();
      const invitationLink = `${window.location.origin}/add-contact-form?newUserEmail=${encodeURIComponent(newContactEmail)}&token=${uniqueToken}`;
      
      // Store the token in localStorage
      localStorage.setItem(`invitation-${newContactEmail}`, uniqueToken);
      
      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        email: newContactEmail,
        message: `${invitationMessage}\nClick the link to join: ${invitationLink}`,
      }, USER_ID);

      if (result.text === "OK") {
        console.log("Invitation sent successfully.");
        setInviteSent(true);
      } else {
        console.error("Failed to send invitation.");
      }

      setShowInviteModal(false);
    } catch (error) {
      console.error("Error sending invitation:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAction = (action) => {
    if (selectedContact) {
      switch (action) {
        case 'block':
          alert(`Blocking contact ${selectedContact}`);
          break;
        case 'share':
          const shareText = `Check out this contact: ${selectedContact}`;
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
          const mailtoUrl = `mailto:?subject=Contact Share&body=${encodeURIComponent(shareText)}`;
          window.open(whatsappUrl, '_blank');
          window.open(mailtoUrl, '_blank');
          break;
        case 'remove':
          setUsers((prevUsers) => prevUsers.filter(user => user.name !== selectedContact));
          break;
        default:
          break;
      }
      setShowActionMenu(false);
      setSelectedContact(null);
    }
  };

  const handleIconClick = (event, contact) => {
    setSelectedContact(contact);
    setActionPosition({ top: event.clientY, left: event.clientX });
    setShowActionMenu(true);
  };

  return (
    <div>
      <div className="d-flex flex-column justify-content-between px-4 py-4">
        <div className="d-flex justify-content-between mb-4" style={{ height: "25.19px" }}>
          <h4 className="mb-0" style={{ fontSize: "22px", color: theme ? "#eff2f7" : "#000000" }}>
            {isSelected}
          </h4>
          <button
            onClick={() => setShowInviteModal(true)}
            style={{ textDecoration: "none", backgroundColor: "transparent", border: "none" }}
          >
            <i
              className="ri-user-add-line"
              style={{ color: theme ? "#abb4d2" : "#7a7f9a", fontSize: "18px", marginRight: "16px" }}
            ></i>
          </button>
        </div>
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
            id={theme ? "gsearchPhDark" : "gsearchPhLight"}
            placeholder="Search contacts..."
            className={"form-control " + (theme ? "phColorDark" : "phColorLight")}
            style={{
              border: "none",
              borderTopRightRadius: "3px",
              borderBottomRightRadius: "3px",
              borderTopLeftRadius: "0",
              borderBottomLeftRadius: "0",
              backgroundColor: theme ? "#36404a" : "#e6ebf5",
              height: "45px",
              padding: "6px 30px",
              fontWeight: "400",
            }}
          />
        </div>
      </div>
      <div className="p-4" style={{ overflowY: "auto", height: "85vh" }}>
        <div style={{ overflowY: "auto" }}>
          {Object.keys(contacts)
            .sort()
            .map((key, index) => (
              <div key={index}>
                <div className="p-3" style={{ fontWeight: "500", color: "#7269ef" }}>
                  {key.toUpperCase()}
                </div>
                {contacts[key].map((contact, index) => (
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ padding: "10px 20px" }}
                    key={index}
                  >
                    <h5
                      className="align-items-center"
                      style={{ fontSize: "15px", color: theme ? "#eff2f7" : "#343a40" }}
                    >
                      {contact}
                    </h5>
                    <i
                      className="ri-more-2-fill"
                      onClick={(e) => handleIconClick(e, contact)}
                      style={{ color: theme ? "#abb4d2" : "#7a7f9a", fontSize: "15px", cursor: "pointer" }}
                    ></i>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>

      <Modal show={showInviteModal} onHide={() => setShowInviteModal(false)} style={{ backgroundColor: "transparent" }}>
        <div className="modal-content" style={{ backgroundColor: theme ? "#36404a" : "#e6ebf5", color: theme ? "#eff2f7" : "#343a40" }}>
          <div className="font-size-16 modal-header">
            <h5 className="modal-title">Add Contacts</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setShowInviteModal(false)}
            ></button>
          </div>
          <div className="p-4 modal-body">
            <form className="">
              <div className="mb-4">
                <label htmlFor="addcontactemail-input" className="form-label">Email</label>
                <input
                  id="addcontactemail-input"
                  placeholder="Enter Email"
                  type="email"
                 
                  value={newContactEmail}
                  onChange={(e) => setNewContactEmail(e.target.value)}
                  className={`form-control  ${theme ? "phColorDark" : "phColorLight"}`}
                  style={{backgroundColor: theme ? "#36404a" : "#e6ebf5",   }}
                  
                
                />
              </div>
              <div>
                <label htmlFor="addcontact-invitemessage-input" className="form-label">Invitation Message</label>
                <textarea
                
                  id="addcontact-invitemessage-input"
                  rows="3"
                  placeholder="Enter Message"
                  value={invitationMessage}
                  onChange={(e) => setInvitationMessage(e.target.value)}
                  className={`form-control  ${theme ? "phColorDark" : "phColorLight"}`}
                  style={{backgroundColor: theme ? "#36404a" : "#e6ebf5",   }}
                  
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <Button variant="link" onClick={() => setShowInviteModal(false)}>Close</Button>
            <Button
              variant="primary"
              onClick={handleInviteSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Inviting..." : "Invite Contact"}
            </Button>
          </div>
        </div>
      </Modal>

      {inviteSent && (
        <div className="p-4">
          <p>Invitation sent. Waiting for user to accept...</p>
        </div>
      )}

      {showActionMenu && (
        <div
          className="card border shadow-sm position-absolute"
          style={{
            top: actionPosition.top,
            left: actionPosition.left,
            zIndex: 1000,
            width: '200px',
            fontSize: '14px',
            color: theme ? '#eff2f7' : '#343a40',
            backgroundColor: theme ? '#36404a' : '#ffffff',
            borderColor: theme ? '#2d353b' : '#dee2e6',
          }}
          onClick={() => setShowActionMenu(false)}
        >
          <div className="card-body p-2">
            <button style={{ backgroundColor: theme ? "#36404a" : "#e6ebf5", color: theme ? "#abb4d2" : "#7a7f9a",}} className="btn btn-light d-flex justify-content-between align-items-center w-100 mb-2" onClick={() => handleAction('share')}>
              Share
              <i className="ri-share-line text-muted" ></i>
            </button>
            <button style={{ backgroundColor: theme ? "#36404a" : "#e6ebf5", color: theme ? "#abb4d2" : "#7a7f9a",}} className="btn btn-light d-flex justify-content-between align-items-center w-100 mb-2" onClick={() => handleAction('block')}>
              Block
              <i className="ri-forbid-line text-muted" ></i>
            </button>
            <button style={{ backgroundColor: theme ? "#36404a" : "#e6ebf5", color: theme ? "#abb4d2" : "#7a7f9a",}} className="btn btn-light d-flex justify-content-between align-items-center w-100 text-danger" onClick={() => handleAction('remove')}>
              Remove
              <i className="ri-delete-bin-line text-muted"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
