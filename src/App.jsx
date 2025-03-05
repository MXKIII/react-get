import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
 const [count, setCount] = useState(30)
 const [users, setUsers] = useState(null)
 const [isLoading, setIsLoading] = useState(true)
 const [error, setError] = useState(null)

const fetchApi = async () => {
  setIsLoading(true)
  setError(null)
  try {
    const response = await axios.get('http://localhost:8000/api/users')
    setUsers(response.data)
  } catch (err) {
    console.log(err)
    setError('Error occured during data fetching')
  } finally {
    setIsLoading(false)
  }
}

useEffect(() => {
  fetchApi()
}, []) 

return (
  <>
    <h1>hello world</h1>
    <p>my name is {count}</p>
    <button onClick={() => setCount(count + 1)}>+1</button>
    
    {isLoading && <p>Loading...</p>}
    {error && <p>Error: {error}</p>}
    
    {users && users.map(user => (
      <div key={user.id} style={{ border: '1px solid white' }}>
        <h2>firstName: {user.firstName} </h2>
        <h2>lastName: {user.lastName}</h2>
        <h2>telephone: {user.telephone} </h2>
        <h2>address: {user.address}</h2>
        <h2>hobbies: 
          <ul>
            {user.hobbies.map((hobby, index) => (
              <li key={index}>{hobby}</li>
            ))}
          </ul>
        </h2>
      </div>
    ))}
  </>
)        
}

export default App
