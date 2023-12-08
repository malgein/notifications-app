import { useState, useEffect } from 'react'
import './Navbar.css'
import Notifications from '../../assets/img/notification.svg'
import Settings from '../../assets/img/settings.svg'
import Message from '../../assets/img/message.svg'

// eslint-disable-next-line react/prop-types
const Navbar = ({ socket }) => {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    socket.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data])
    })
  }, [socket])
  
  console.log(notifications)

  const displayNotification = ({ senderName, type }) => {
    let action;

    if (type === 1) {
      action = "liked";
    } else if (type === 2) {
      action = "commented";
    } else {
      action = "shared";
    }
    return (
      <span className="notification">{`${senderName} ${action} your post.`}</span>
    );
  };


  return (
    <div className='navbar'>
      <span className='logo'>Notifications App</span>
      <div className='icons'>
        <div className="icon">
          <img src={Notifications} alt='' className='iconImg'/>
          <div className='counter'>2</div>
        </div>
        <div className="icon">
          <img src={Settings} alt='' className='iconImg'/>
          <div className='counter'>2</div>
        </div>
        <div className="icon">
          <img src={Message} alt='' className='iconImg'/>
          <div className='counter'>2</div>
        </div>
      </div>
      {/* {open && ( */}
        <div className="notifications">
          {notifications.map((n) => displayNotification(n))}
          <button className="nButton" >
            Mark as read
          </button>
        </div>
      {/* // )} */}
  </div>
  )
}

export default Navbar