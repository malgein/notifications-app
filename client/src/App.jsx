import './App.css'
import { useState, useEffect } from 'react'
//Componente de barra de navegacion
import Navbar from './components/navbar/Navbar'
//Componente de Carta  que representa cada post que hacemos
import Card from './components/card/Card'
//Continee todos los post de data que seran renderizados
import {posts} from './data'
//importa la version cliente de socket io en la constante io
import {io} from 'socket.io-client'


function App() {
  
  //Representa el usuario que se esta logeando
  const [username, setUsername] = useState('')

  //Representa en usuario que se logeo y que entrara logeado a la app
  const [user, setUser] = useState('')

  const [socket, setSocket] = useState(null)

  // console.log(posts)

  
  useEffect(() => {
    // //Al principio de la app hacemos un llamado mediante socket io al servidor donde se esta ejecutando nuestro web socket
    // const socket = io("http://localhost:5000")

    
    // socket.on("firstEvent", (msg) => {
    //   console.log(msg)
    // })

    setSocket(io("http://localhost:5000"))
  }, [])
  
  useEffect(() => {
    socket?.emit("newUser", user)
  }, [socket, user])
  

  return (
    <div className='App'>
      <div className='container'>
        {/* Si hay usuario logeado retorna la navbar y cada uni de los posteos*/}
        {user ? (
          <>
            <Navbar socket={socket}/>
            {/* Se renderiza uno por uno cada post de la data por cada uno se renderiza una card */}
            {posts.map(post => {
              return <Card key={post.id} post={post} socket={socket} user={user}/> 
            })}
            {/* Mostramos el usuario que se logeo en la esquina superior derecha */}
            <span className='username'>{user}</span>
          </>
        ) : (
          // casilla de login
        <div className='login'>
          {/* guardamos los datos del usuario que se logea en un estado */}
          <input type='text' placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
          {/* pasa el valor de los input a user asi cuanod esta tenga algun valor renderiza el jsx condicionada arriba */}
          <button onClick={() =>setUser(username)}>Login</button>
        </div>
        )}
      </div>
    </div>
  )
}

export default App
