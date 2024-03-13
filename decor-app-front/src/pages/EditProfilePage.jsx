import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function EditProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [profileDescription, setProfileDescription] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/user/${userId}`)
      .then((response) => {
        const userData = response.data;
        setUser(userData);
        setName(userData.name);
        setCity(userData.city);
        setProfileDescription(userData.profileDescription);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, city, profileDescription };

    axios
      .put(`${API_URL}/api/user/${userId}`, requestBody)
      .then((response) => {
        navigate(`/user/${userId}`);
      })
      .catch((error) => console.log(error));
  };

  const deleteProfile = () => {
    axios
      .delete(`${API_URL}/api/user/${userId}`)
      .then(() => {
        navigate("/"); // You can navigate to home or another appropriate page
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProfilePage">
      <h3>Edit Profile</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label>Profile Description:</label>
        <textarea
          value={profileDescription}
          onChange={(e) => setProfileDescription(e.target.value)}
        />

        <button type="submit">Update Profile</button>
      </form>

      <button onClick={deleteProfile}>Delete Profile</button>
    </div>
  );
}

export default EditProfilePage;
