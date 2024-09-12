import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const Groups = ({ isSelected, theme, groupSelected, setGroupSelected }) => {
  const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
  const [groups, setGroups] = useState([
    { name: "Group1" },
    { name: "Group2" },
    { name: "Group3" },
    { name: "Group4" },
    { name: "Group5" },
    { name: "Group6" },
  ]);
  const [contacts, setContacts] = useState({
    A: ["Albert Rodarte", "Allison Etter"],
    B: ["Bob Smith", "Barbara White"],
    // Add more contacts as needed
  });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [error, setError] = useState(""); // Added error state for validation

  const handleCreateGroup = (newGroup) => {
    setGroups([...groups, newGroup]);
    setShowCreateGroupModal(false);
  };

  const handleMemberChange = (e) => {
    const { value, checked } = e.target;
    setSelectedMembers((prev) =>
      checked ? [...prev, value] : prev.filter((member) => member !== value)
    );
  };

  return (
    <div>
      <div className="d-flex flex-column justify-content-between px-4 py-4">
        <div className="d-flex justify-content-between mb-4" style={{ height: "25.19px" }}>
          <h4 className="mb-0" style={{ fontSize: "21px", color: theme ? "#eff2f7" : "#000000" }}>
            {isSelected}
          </h4>
          <button
            onClick={() => setShowCreateGroupModal(true)}
            style={{ textDecoration: "none", backgroundColor: "transparent", border: "none" }}
          >
            <i
              className="ri-group-line"
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
            placeholder="Search groups..."
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
      <div className="p-4">
        {groups.map((group) => (
          <div
            key={group.name}
            className="px-4 py-3"
            style={{
              backgroundColor: groupSelected === group.name ? (theme ? "#36404a" : "#e6ebf5") : "transparent",
            }}
          >
            <div onClick={() => setGroupSelected(group.name)} className="d-flex align-items-center">
              <div className="me-3">
                <div
                  className="rounded-circle mr-3 justify-content-center align-items-center d-flex"
                  style={{
                    width: "35.19px",
                    height: "35.19px",
                    color: "#7269ef",
                    backgroundColor: theme ? "#7269ef26" : "#e3e1fc",
                  }}
                >
                  {group.name[0].toUpperCase()}
                </div>
              </div>
              <div>
                <h5 style={{ color: theme ? "#eff2f7" : "#343a40", fontSize: "15px" }}>
                  {"#" + group.name}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CreateGroupModal
        show={showCreateGroupModal}
        onHide={() => setShowCreateGroupModal(false)}
        onCreateGroup={handleCreateGroup}
        contacts={contacts}
        selectedMembers={selectedMembers}
        onMemberChange={handleMemberChange}
        error={error}
        setError={setError}
        theme={theme}
      />
    </div>
  );
};

const CreateGroupModal = ({ show, onHide, onCreateGroup, contacts, selectedMembers, onMemberChange, error, setError, theme }) => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that at least 2 members are selected
    if (selectedMembers.length < 2) {
      setError("Please select at least 2 members.");
      return;
    }

    // Clear the error if validation passes
    setError("");

    onCreateGroup({ name: groupName, description: groupDescription, members: selectedMembers });
    setGroupName("");
    setGroupDescription("");
  };

  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-90w" style={{ backgroundColor: "transparent" }}>
      <Modal.Header closeButton style={{ backgroundColor: theme ? "#36404a" : "#e6ebf5", color: theme ? "#eff2f7" : "#343a40" }}>
        <Modal.Title>Create New Group</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: theme ? "#36404a" : "#e6ebf5", color: theme ? "#eff2f7" : "#343a40" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="groupName" className="form-label">Group Name</label>
            <input
              id="groupName"
              placeholder="Enter Group Name"
              //type="text"
              //id={theme ? "gsearchPhDark" : "gsearchPhDark"}
          
              className={`form-control  ${theme ? "phColorDark" : "phColorLight"}`}
              style={{backgroundColor: theme ? "#36404a" : "#e6ebf5",   }}
              //className={`form-control ${theme ? "bg-dark text-light" : "bg-light text-dark"} border-input`}
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4" >
            <label className="form-label">Group Members</label>
            <div className="mb-3">
              <button
                type="button"
                className={`btn ${theme ? "btn-light" : "btn-secondary"} btn-sm`}
                data-bs-toggle="collapse"
                data-bs-target="#groupMemberCollapse"
                style={{ backgroundColor: theme ? "#36404a" : "#e6ebf5", color: theme ? "#eff2f7" : "#343a40" }}
              >
                Select Members
              </button>
            </div>
            <div id="groupMemberCollapse" className="collapse show">
              <div 
               className={`form-control  ${theme ? "phColorDark" : "phColorLight"}`}
               style={{backgroundColor: theme ? "#36404a" : "#e6ebf5",   }}
               >
                <div className="card-header">
                  <h5 className="font-size-15 mb-0">Contacts</h5>
                </div>
                <div className="p-2 card-body">
                  <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                    {Object.keys(contacts).sort().map((key) => (
                      <div key={key}>
                        <div className={`p-3 font-weight-bold ${theme ? "text-primary" : "text-dark"}`}>{key.toUpperCase()}</div>
                        <ul className="list-unstyled">
                          {contacts[key].map((contact) => (
                            <li key={contact}>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  value={contact}
                                  checked={selectedMembers.includes(contact)}
                                  onChange={onMemberChange}
                                />
                                <label className="form-check-label">{contact}</label>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="groupDescription" className="form-label">Description</label>
            <textarea
              id={theme ? "dark" : "light"}
              placeholder="Add Group Description"
              className={`form-control  ${theme ? "phColorDark" : "phColorLight"}`}
              style={{backgroundColor: theme ? "#36404a" : "#e6ebf5",   }}
              
              //className={`form-control ${theme ? "bg-dark text-light" : "bg-light text-dark"} border-output`}
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-danger mt-2">{error}</div>
          )}

          <div className="mt-4 d-flex justify-content-end">
            <Button type="button" onClick={onHide} className="btn-light me-2"
            id={theme ? "dark" : "light"}
              
             style={{backgroundColor: theme ? "#36404a" : "#e6ebf5"  ,color:theme ? "#fff":"black"}}
             >Close</Button>
            <Button type="submit" className="btn-primary">Create Group</Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default Groups;
