import React, { useState } from "react";

const UpdateProfile = ({ user, onProfileUpdated }) => {
  const [name, setName] = useState(user.name);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(user.profile_photo_url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, profile_photo_url: profilePhotoUrl }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      onProfileUpdated(data.user);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Profile Photo URL:</label>
        <input
          type="text"
          value={profilePhotoUrl}
          onChange={(e) => setProfilePhotoUrl(e.target.value)}
        />
      </div>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfile;
