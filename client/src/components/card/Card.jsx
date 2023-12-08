/* eslint-disable react/prop-types */
import './Card.css'
import { useState } from 'react'
//Archivos de la carpeta assets que representa los iconos del xorazon, de comentarios, de compartir de info, etc
import Heart from '../../assets/img/heart.svg'
import HeartFilled from '../../assets/img/heartFilled.svg'
import Comment from '../../assets/img/comment.svg'
import Share from '../../assets/img/share.svg'
import Info from '../../assets/img/info.svg'


const Card = ({post, socket, user}) => {

  // console.log(post)

  //Estado que segun este activado o no renderizara el icono de corazon vacio o de corazon lleno
  const [liked, setLiked] = useState(false)

  //funcion que se llama cuando el usuario hace click en el boton de like cambiado el estado de line a unlike
  const handleNotification = (type) => {
    setLiked(true)
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type
    })
  }

  return (
    <div className='card'>
      {/* {console.log(post)} */}
      <div className="info">
        <img src={post.userImg} alt='' className='userImg' />
        {/* Nombre completo de quien hace el post */}
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt='' className='postImg' />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt='' className='cardIcon' onClick={handleNotification}/>
        ) : (
          <img src={Heart} alt='' className='cardIcon' onClick={() => handleNotification(1)}/>
        )}
        <img src={Comment} alt='' className='cardIcon' onClick={() => handleNotification(2)}/>
        <img src={Share} alt='' className='cardIcon' onClick={() => handleNotification(3)}/>
        <img src={Info} alt='' className='cardIcon infoIcon' />
      </div>
    </div>
  )
}

export default Card
