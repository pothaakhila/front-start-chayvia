import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProfilePage = ({ showProfilePage, handleCloseProfilePage }) => {
  const [user, setUser] = React.useState(null);
  const { userId } = useParams(); // Assuming you have a route parameter for userId

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3030/getUser/${userId}`);
        setUser(data);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Error fetching user details');
      }
    };

    fetchUser();
  }, [userId]);

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <Modal show={showProfilePage} onHide={handleCloseProfilePage} centered>
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">User Profile</h5>
          <Button variant="close" onClick={handleCloseProfilePage}></Button>
        </div>
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar-lg mx-auto mb-4">
              <img
                src={user.profile_photo_url}
                alt={user.name}
                className="img-thumbnail rounded-circle"
                style={{ width: '100px', height: '100px' }}
              />
            </div>
            <h5 className="text-truncate">{user.name}</h5>
            <p className="text-muted">{user.email}</p>
            <p className="text-muted">{user.phone}</p>
            <p className="text-muted">{user.address}</p>
          </div>
        </div>
        <div className="modal-footer">
          <Button variant="secondary" onClick={handleCloseProfilePage}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ProfilePage;
