import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
const Settings = ({ isSelected, theme, user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [status, setStatus] = useState("Available");
  const [isEditing, setIsEditing] = useState(false);
  const [newProfileUrl, setNewProfileUrl] = useState(user.profile_photo_url);
  const [newName, setNewName] = useState(user.name);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSave = () => {
    // Save logic here (e.g., update the user data in a backend service)
    // For now, we'll just log the new values
    console.log("Profile saved:", { newProfileUrl, newName });
    setIsEditing(false);
  };

  const dropdownMenuStyles = {
    display: isDropdownOpen ? 'block' : 'none',
    position: 'absolute',
    backgroundColor: "transparent",
    border: '1px solid #abb4d2',
    borderRadius: '5px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    top: '100%',
    left: '0',
    minWidth: '150px',
    zIndex: 1000,
    marginTop: '5px'
  };

  return (
    <div>
      <div className="d-flex justify-content-between px-4 pt-4">
        <h4
          className="mb-0"
          style={{ fontSize: "21px", color: theme ? "#eff2f7" : "#000000" }}
        >
          {isSelected}
        </h4>
        <Dropdown>
          <Dropdown.Toggle
            className="profile"
            style={{
              backgroundColor: "transparent",
              border: "none",
              padding: "0",
            }}
            variant="success"
            id="dropdown-basic"
          >
            <i
              className="ri-more-2-fill"
              style={{ color: theme ? "#abb4d2" : "#7a7f9a", fontSize: "18px" }}
            ></i>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ backgroundColor: theme ? "#262e35" : "#fff" }}>
            <Dropdown.Item href="#/action-1" style={{ color: theme ? "#abb4d2" : "#7a7f9a", }}>Edit</Dropdown.Item>
            <Dropdown.Item href="#/action-2" style={{ color: theme ? "#abb4d2" : "#7a7f9a", }}> Action</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-3" style={{ color: theme ? "#abb4d2" : "#7a7f9a", }}>Another Action</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div
        className="p-4 text-center"
        style={{
          borderBottom: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
          position: 'relative'
        }}
      >
        <div className="mb-4">
          {isEditing ? (
            <>
              <input
                type="text"
                value={newProfileUrl}
                onChange={(e) => setNewProfileUrl(e.target.value)}
                placeholder="Profile URL"
                className="form-control mb-2"
              />
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Name"
                className="form-control mb-2"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <img
                className="rounded-circle"
                src={newProfileUrl}
                alt="profile"
                style={{
                  width: "96px",
                  height: "96px",
                  padding: "4px",
                  marginTop: "-2px",
                }}
              />
              <button
                type="button"
                className="avatar-xs p-0 rounded-circle profile-photo-edit btn btn-light"
                style={{ position: "relative", right: "30px", top: '28px', borderRadius: '20px', width: '30px', height: '30px', backgroundColor: '#e6ebf5' }}
                onClick={() => setIsEditing(true)}
              >
                <i className="ri-pencil-fill"></i>
              </button>
            </>
          )}
        </div>
        
        <h5
          style={{ fontSize: "16px", color: theme ? "#eff2f7" : "#000000" }}
          className="mb-1"
        >
          {newName}
        </h5>
        <div className="d-inline-block mb-1" style={{ position: 'relative' }}>
          <a
            aria-expanded={isDropdownOpen}
            onClick={toggleDropdown}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <h6 style={{ margin: '0', color: theme ? "#abb4d2" : "#7a7f9a", }}>{status}</h6>
            <i className="ri-arrow-drop-down-line" style={{ marginLeft: '5px', color: theme ? "#abb4d2" : "#7a7f9a", }}></i>
          </a>

          <div
            className="dropdown-menu"
            role="menu"
            aria-hidden={!isDropdownOpen}
            style={dropdownMenuStyles}
          >
            <button
              role="menuitem"
              className="dropdown-item"
              onClick={() => {
                setStatus("Available");
                setIsDropdownOpen(false);
              }}
              style={{ color: theme ? "#abb4d2" : "#7a7f9a", }}
            >
              Available
            </button>
            <button
              role="menuitem"
              className="dropdown-item"
              onClick={() => {
                setStatus("Busy");
                setIsDropdownOpen(false);
              }}
              style={{ color: theme ? "#abb4d2" : "#7a7f9a", }}
            >
              Busy
            </button>
          </div>
        </div>
      </div>
      <div className="p-4" >
        <Accordion defaultActiveKey="0" >
          <Accordion.Item eventKey="0">
            <Accordion.Header
              style={{
                backgroundColor: theme ? "#a6b0cf08" : "#49505708",
                color: theme ? "#eff2f7" : "#000000",
              }}
            >
              <h5
                style={{
                  color: theme ? "#eff2f7" : "#000000",
                  fontSize: "14px",
                  margin: "0",
                }}
              >
                Personal Info
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
                <div className="float-end">
                  <button type="button" className="btn btn-light btn-sm"   onClick={() => setIsEditing(true)}>
                    <i className="ri-edit-fill me-1 align-middle"></i> Edit
                  </button>
                </div>
                <h5
                  style={{
                    color: theme ? "#eff2f7" : "#343a40",
                    fontSize: "14px",
                  }}
                  className="mb-2"
                >
                  {newName}
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
                Privacy
              </h5>
            </Accordion.Header>
            <Accordion.Body
              style={{ backgroundColor: theme ? "#262e35" : "#fff" }}
            >
              <div>
                <div className="py-3 d-flex justify-content-between align-items-center">
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#000000",
                      fontSize: "14px",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    Profile photo
                  </h5>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{
                        backgroundColor: theme ? "#36404a" : "#e6ebf5",
                        color: theme ? "#eff2f7" : "#212529",
                        padding: "4px 8px",
                        fontSize: "14px",
                        border: "none",
                      }}
                    >
                      Everyone
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1" active>
                        Everyone
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Selected
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Nobody</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="py-3 d-flex justify-content-between align-items-center">
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#000000",
                      fontSize: "14px",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    Last seen
                  </h5>
                  <Form>
                    <Form.Check type="switch" id="custom-switch" />
                  </Form>
                </div>
                <div className="py-3 d-flex justify-content-between align-items-center">
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#000000",
                      fontSize: "14px",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    Status
                  </h5>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{
                        backgroundColor: theme ? "#36404a" : "#e6ebf5",
                        color: theme ? "#eff2f7" : "#212529",
                        padding: "4px 8px",
                        fontSize: "14px",
                        border: "none",
                      }}
                    >
                      Everyone
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1" active>
                        Everyone
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Selected
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Nobody</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="py-3 d-flex justify-content-between align-items-center">
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#000000",
                      fontSize: "14px",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    Read receipts
                  </h5>
                  <Form>
                    <Form.Check type="switch" id="custom-switch" />
                  </Form>
                </div>
                <div className="py-3 d-flex justify-content-between align-items-center">
                  <h5
                    style={{
                      color: theme ? "#eff2f7" : "#000000",
                      fontSize: "14px",
                      fontWeight: "500",
                      margin: "0",
                    }}
                  >
                    Groups
                  </h5>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="success"
                      id="dropdown-basic"
                      style={{
                        backgroundColor: theme ? "#36404a" : "#e6ebf5",
                        color: theme ? "#eff2f7" : "#212529",
                        padding: "4px 8px",
                        fontSize: "14px",
                        border: "none",
                      }}
                    >
                      Everyone
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1" active>
                        Everyone
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        Selected
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Nobody</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
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
                Security
              </h5>
            </Accordion.Header>
            <Accordion.Body
              style={{ backgroundColor: theme ? "#262e35" : "#fff" }}
            >
              <div className="">
                <div className="d-flex justify-content-between align-items-center">
                  <h5
                    style={{
                      fontSize: "13px",
                      color: theme ? "#eff2f7" : "#343a40",
                      marginBottom: "0",
                    }}
                  >
                    Show security notification
                  </h5>
                  <Form>
                    <Form.Switch
                      className={
                        theme
                          ? "switchDark switchDark"
                          : "switchLight switchLight"
                      }
                    />
                  </Form>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
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
                Help
              </h5>
            </Accordion.Header>
            <Accordion.Body
              style={{
                backgroundColor: theme ? "#262e35" : "#fff",
                padding: "20px",
              }}
            >
              <div
                className=""
                style={{
                  color: theme ? "#a6b0cf" : "#495057",
                  fontSize: "13px",
                  fontWeight: "500",
                }}
              >
                <div className="py-2 ">
                  <p className="m-0">FAQs</p>
                </div>
                <div
                  className="py-2 "
                  style={{
                    borderTop: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
                  }}
                >
                  <p className="m-0">Contact</p>
                </div>
                <div
                  className="py-2 "
                  style={{
                    borderTop: "1px solid " + (theme ? "#36404a" : "#f0eff5"),
                  }}
                >
                  <p className="m-0">Terms & Privacy</p>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
};

export default Settings;
