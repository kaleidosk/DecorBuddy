import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5005';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    // Verificando si userId está definido antes de hacer la solicitud GET
    if (userId) {
      axios
        .get(`${API_URL}/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${storedToken}` }
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
        })
        .catch((error) => console.log(error));
    }
  }, [userId]); // Asegúrate de que useEffect se ejecute cada vez que cambie userId

  return (
    <div className="ProfilePage">
      {user && (
        <>
          <h1>Welcome, {user.name}</h1>
          <img src={user.picture} alt={user.name} />
          <p>City: {user.city}</p>
          <p>Description: {user.profileDescription}</p>
          <p>Role: {user.role}</p>
          
            <Link to={`/edit-profile/${userId}`}>
              <button>Edit Profile</button>
            </Link>
          
        </>
      )}
    </div>
  );
}

export default ProfilePage;



