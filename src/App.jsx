import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8000/api/users');
      setUsers(response.data);
    } catch (err) {
      setError('Error occured during data loading');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <>
      <h1>Liste des utilisateurs</h1>
      {users && users.map(user => (
        <div key={user.id}>
          <h2>Nom : {user.firstName} {user.lastName}</h2>
          <p>Téléphone : {user.telephone}</p>
          <p>Adresse : {user.address}</p>
          <p>Loisirs : </p>
          <ul>
            {user.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
};

export default App;
