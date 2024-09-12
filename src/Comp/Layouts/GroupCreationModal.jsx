const CreateGroupModal = ({ show, onHide, onCreateGroup, users }) => {
    const [groupName, setGroupName] = useState("");
    const [groupDescription, setGroupDescription] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
  
    const handleMemberChange = (e) => {
      const { value, checked } = e.target;
      setSelectedMembers((prev) =>
        checked ? [...prev, value] : prev.filter((member) => member !== value)
      );
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onCreateGroup({ name: groupName, description: groupDescription, members: selectedMembers });
      setGroupName("");
      setGroupDescription("");
      setSelectedMembers([]);
    };
  
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="groupName" className="form-label">Group Name</label>
              <input
                id="groupName"
                placeholder="Enter Group Name"
                type="text"
                className="form-control"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="form-label">Group Members</label>
              <div className="mb-3">
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  data-bs-toggle="collapse"
                  data-bs-target="#groupMemberCollapse"
                >
                  Select Members
                </button>
              </div>
              <div id="groupMemberCollapse" className="collapse">
                <div className="border card">
                  <div className="card-header">
                    <h5 className="font-size-15 mb-0">Contacts</h5>
                  </div>
                  <div className="p-2 card-body">
                    <Contacts
                      isSelected={""}
                      theme={false}
                      users={users} // Pass users to Contacts component
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="groupDescription" className="form-label">Description</label>
              <textarea
                id="groupDescription"
                className="form-control"
                rows="3"
                placeholder="Enter Description"
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={onHide}>Close</Button>
              <Button variant="primary" type="submit">Create Group</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };
  