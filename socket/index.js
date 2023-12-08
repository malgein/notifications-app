// console.log('sockets works!')
//Archivo que hace de servior como tal
//archivo padre y main del servidor de socket io

//Importamos server de socket io
import { Server } from "socket.io";

//Permitimos a traves de las cors el aceeso a la aplicacion del front-end
const io = new Server({ 
  cors: {
    origin: "http://localhost:5173",
  },
});

//Array que representa todos los usuarios conectados
let onlineUsers = []

//funcionalidad para agregar  un nuevo usuario, verifica si ya no encuentra en nuestro array de usuariios en linea y si no es asi lo agrega
const addNewUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

//Funciionalidad para eliminar usuarios
const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

//Funcionalidad para obtener usuarios
const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

io.on("conection", (socket) => {
  // console.log("someone has conected!")

	// socket.on("disconnect", () => {
	// 	console.log("someone has left!")
	// })
  // io.emit(" ", "Hello this is test!")

  // [
  //   {
  //     username: "john",
  //     socketId: "asdfg"
  //   },
  //   {
  //     username: "monika",
  //     socketId: "hjkl"
  //   }
  // ]

  socket.on("newUser", (username) => {
    addNewUser(username, socket.id)
  })

  socket.on("sendNotification", ({ senderName, receiverName, type}) => {
    const receiver = getUser(receiverName)
    io.to(receiver.socketId).emit("getNotification", {
      senderName,
      type
    })
  })

  socket.on("disconnect", () => {

  })
})

//El sevirdor de sockets se ejecutara en el localhostpuesrto 5000
io.listen(5000)