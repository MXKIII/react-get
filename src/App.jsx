import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
  const [users, setUsers] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [telephone, setTelephone] = useState('')
  const [address, setAddress] = useState('')
  const [hobbies, setHobbies] = useState('')
  
  const [confirmationMessage, setConfirmationMessage] = useState('')

  const handleNewUser = async (e) => {
    e.preventDefault()
    try {
      const newUser = {
        firstName,
        lastName,
        telephone,
        address,
        hobbies: hobbies.split(',').map(hobby => hobby.trim())
      }
      await axios.post('http://localhost:8000/api/users', newUser)
      setConfirmationMessage('User was succesfully added')
      setFirstName('')
      setLastName('')
      setTelephone('')
      setAddress('')
      setHobbies('')
      fetchApi()
    } catch (err) {
      console.log(err)
      setError('Error during user add')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchApi = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get('http://localhost:8000/api/users')
      setUsers(response.data)
    } catch (err) {
      console.log(err)
      setError('Error during user fetch')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchApi()
  }, [])

  return (
    <>
      <h1>Gestion des utilisateurs</h1>
      
      <form onSubmit={handleNewUser}>
        <input 
          type="text" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
          placeholder="Prénom" 
          required 
        />
        <input 
          type="text" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          placeholder="Nom" 
          required 
        />
        <input 
          type="tel" 
          value={telephone} 
          onChange={(e) => setTelephone(e.target.value)} 
          placeholder="Téléphone" 
          required 
        />
        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Adresse" 
          required 
        />
        <input 
          type="text" 
          value={hobbies} 
          onChange={(e) => setHobbies(e.target.value)} 
          placeholder="Hobbies" 
        />
        <button type="submit">Ajouter un utilisateur</button>
      </form>

      {confirmationMessage && <p>{confirmationMessage}</p>}
      
      {isLoading && <p>Chargement...</p>}
      {error && <p>Erreur : {error}</p>}
      
      <h2>Liste des utilisateurs</h2>
      {users && users.map(user => (
        <div key={user.id} style={{ border: '1px solid white', margin: '10px', padding: '10px' }}>
          <h3>{user.firstName} {user.lastName}</h3>
          <p>Téléphone : {user.telephone}</p>
          <p>Adresse : {user.address}</p>
          <p>Hobbies : {user.hobbies.join(', ')}</p>
        </div>
      ))}
    </>
  )        
}

export default App
