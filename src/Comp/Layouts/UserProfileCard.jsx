import React from 'react';
import { Button } from 'react-bootstrap';
import './UserProfileSidebar.css';

const UserProfileCard = ({ user, show, onClose }) => {
  if (!show) return null;

  return (
    <div className="user-profile-sidebar">
      <div className="px-3 px-lg-4 pt-3 pt-lg-4">
        <div className="user-chat-nav text-end">
          <Button type="button" id="user-profile-hide" className="nav-btn btn btn-none" onClick={onClose}>
            <i className="ri-close-line"></i>
          </Button>
        </div>
      </div>
      <div className="text-center p-4 border-bottom">
        <div className="mb-4 d-flex justify-content-center">
          <img src={user.profile_photo_url} className="rounded-circle avatar-lg img-thumbnail" alt={user.name} />
        </div>
        <h5 className="font-size-16 mb-1 text-truncate">{user.name}</h5>
        <p className="text-muted text-truncate mb-1">
          <i className="ri-record-circle-fill font-size-10 text-success me-1"></i>Active
        </p>
      </div>
      <div className="p-4 user-profile-desc" style={{ maxHeight: '100%' }}>
        <div className="text-muted">
          <p className="mb-4">"If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual."</p>
        </div>
        <div id="profile-user-accordion" className="custom-accordion">
          <div className="shadow-none border mb-2 card">
            <div id="profile-user-headingOne" className="card-header">
              <h5 className="font-size-14 m-0">
                <i className="ri-user-2-line me-2 align-middle d-inline-block"></i>
                About
                <i className="mdi mdi-chevron-up float-end accor-plus-icon"></i>
              </h5>
            </div>
            <div className="collapse show">
              <div className="card-body">
                <div>
                  <p className="text-muted mb-1">Name</p>
                  <h5 className="font-size-14">{user.name}</h5>
                </div>
                <div className="mt-4">
                  <p className="text-muted mb-1">Email</p>
                  <h5 className="font-size-14">{user.email}</h5>
                </div>
                <div className="mt-4">
                  <p className="text-muted mb-1">Time</p>
                  <h5 className="font-size-14">11:40 AM</h5>
                </div>
                <div className="mt-4">
                  <p className="text-muted mb-1">Location</p>
                  <h5 className="font-size-14 mb-0">California, USA</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-1 shadow-none border card">
            <div id="profile-user-headingOne" className="card-header">
              <h5 className="font-size-14 m-0">
                <i className="ri-attachment-line me-2 align-middle d-inline-block"></i>
                Attached Files
                <i className="mdi mdi-chevron-down float-end accor-plus-icon"></i>
              </h5>
            </div>
            <div className="collapse">
              <div className="card-body">
                {/* Attached Files List */}
                {/* You can add dynamic file attachments here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
