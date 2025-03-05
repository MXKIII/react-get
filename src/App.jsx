import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const App = () => {
 const [count, setCount]= useState(30)
 const [users, setUsers]= useState(null)

const fetchApi =async () =>{
  try{
    const response = await axios.get('http://localhost:8000/api/users')
    setUsers(response.data)
  }
  catch(err){
    console.log(err)
  }
}

console.log(users)

useEffect(()=>{
  fetchApi()
},[count])

  return (
    <>
      <h1>hello world</h1>
      <p>my name is {count}</p>
      <button onClick={()=> setCount(count + 1)}>+1</button>
      {users && users.map(user=>{
        return(
          <div style={{ border: '1px solid white' }}>
            <h2>firstName: {user.firstName} </h2>
            <h2>lastName: {user.lastName}</h2>
            <h2>telephone: {user.telephone} </h2>
            <h2>address: {user.address}</h2>
            <h2>hobbies: {user.hobbies}</h2>
          </div>
        )
      })}
    </>
  )        
}

export default App
