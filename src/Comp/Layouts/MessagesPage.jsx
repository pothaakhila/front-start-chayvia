import React,{ useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import Dropdown from "react-bootstrap/Dropdown";
const Message = ({ content, left, sentAt, user, theme, chatUser, fileUrl, imageUrl }) => {
  const [showModal, setShowModal] = useState(false);
  const sentDate = new Date(sentAt);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef(null);

  // Toggle dropdown visibility
  const handleToggle = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    setIsOpen(prevState => !prevState); // Toggle state
  };

  // Handle clicks outside of dropdown
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false); // Close dropdown if clicked outside
    }
  };

  // Add event listener for clicks outside the dropdown
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-4 w-100 d-flex" style={{ justifyContent: left ? 'flex-start' : 'flex-end' }}>
      <div className="d-flex" style={{ flexDirection: left ? 'row' : 'row-reverse' }}>
        <div className="d-flex">
          <div className="d-flex flex-column justify-content-end">
            <img
              className="rounded-circle"
              src={left ? chatUser.profile_photo_url : user.profile_photo_url}
              alt=""
              style={{ width: '35.19px', height: '35.19px' ,position:'relative',right:'20px',bottom:'30px'}}
            />
            
          </div>
        </div>
        <div className="d-flex flex-column px-3">
          <div
            className="px-3 py-2 d-flex flex-column"
            style={{
              backgroundColor: left
                ? '#7269ef'
                : theme
                ? 'rgb(54 64 74)'
                : '#f5f7fb',
              borderRadius: '10px',
            }}
          >
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Message"
                style={{ maxWidth: '200px', maxHeight: '200px', borderRadius: '8px' }}
              />
            )}
            {fileUrl && (
              <a
                href={fileUrl}
                download
                style={{ color: left ? '#ffffff' : theme ? '#eff2f7' : '#343a40' }}
              >
                Download file
              </a>
            )}
            <div
              style={{
                color: left ? '#ffffff' : theme ? '#eff2f7' : '#343a40',
                fontSize: '17px',
                fontWeight: '500',
              }}
            >
              <div>{content}</div>
              
            </div>
            <div
              className="w-100 d-flex justify-content-end"
              style={{
                fontSize: '13px',
                paddingTop: '5px',
                color: left ? '#ffffff80' : theme ? '#abb4d2' : '#7a7f9a',
              }}
            >
              {sentDate.getHours() + ':' + sentDate.getMinutes()}
            </div>
          </div>
          
          <Dropdown show={isOpen} ref={dropdownRef}>
      <Dropdown.Toggle
        variant="success"
        id="dropdown-basic"
        className="profile"
        style={{
          backgroundColor: "transparent",
          border: "none",
          color: theme ? "#abb4d2" : "#7a7f9a",
          position: 'relative',
          bottom: "70px",
          right: '30px',
        }}
        onClick={handleToggle} // Toggle on click
      >
        <i
          className="ri-more-2-line"
          style={{ marginRight: "5px", fontSize: "20px" }}
        ></i>
      </Dropdown.Toggle>
      
      <Dropdown.Menu
        className="dropdown-menu"
        style={{
          position: "absolute",
          transform: "translate3d(0px, 21.5px, 0px)",
         backgroundColor: theme ? "#262e35" : "#fff" 
        }}
      >
        <Dropdown.Item
          href="#/copy"
          className="dropdown-item"
          style={{ padding: "8px 16px", color: theme ? "#abb4d2" : "#7a7f9a" }}
         
        >
          Copy <i className="ri-file-copy-line float-end text-muted" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}></i>
        </Dropdown.Item>
        <Dropdown.Item
          href="#/save"
          className="dropdown-item"
          style={{ padding: "8px 16px" , color: theme ? "#abb4d2" : "#7a7f9a"}}
        >
          Save <i className="ri-save-line float-end text-muted" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}></i>
        </Dropdown.Item>
        <Dropdown.Item
          href="#/forward"
          className="dropdown-item"
          style={{ padding: "8px 16px" , color: theme ? "#abb4d2" : "#7a7f9a"}}
        >
          Forward <i className="ri-chat-forward-line float-end text-muted" style={{ color: theme ? "#abb4d2" : "#7a7f9a"}}></i>
        </Dropdown.Item>
        <Dropdown.Item
          href="#/delete"
          className="dropdown-item"
          style={{ padding: "8px 16px", color: theme ? "#abb4d2" : "#7a7f9a" }}
        >
          Delete <i className="ri-delete-bin-line float-end text-muted" ></i>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

          <div >
          <div style={{ fontSize: '14px',position:'relative',right:'8px',bottom:'40px' }}>
              {left ? chatUser.name : user.name}
            </div>
            
          </div>
         
        </div>
      </div>

      {/* Call Modal */}
      <Modal show={showModal} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>Start Call</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <div className="text-center p-4" >
            <div className="avatar-lg mx-auto mb-4">
              <img
                src={left ? chatUser.profile_photo_url : user.profile_photo_url}
                alt=""
                className="img-thumbnail rounded-circle"
                style={{ width: '80px', height: '80px' }}
              />
            </div>
            <h5 className="text-truncate">{left ? chatUser.name : user.name}</h5>
            <p className="text-muted">Start Audio Call</p>
            <div className="mt-5">
              <ul className="list-inline mb-1">
                <li className="list-inline-item px-2 me-2 ms-0">
                  <Button variant="danger" className="avatar-sm rounded-circle">
                    <i className="ri-close-fill" style={{ fontSize: '20px' }}></i>
                  </Button>
                </li>
                <li className="list-inline-item px-2">
                  <Button variant="success" className="avatar-sm rounded-circle">
                    <i className="ri-phone-fill" style={{ fontSize: '20px' }}></i>
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    
    </div>
  );
};

export default Message;
