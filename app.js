require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routes')
const {errHandler} = require('./middlewares/errorHandler');
const http = require('http').Server(app);
const socketIO = require('socket.io')(http);
// const {Server} = require('socket.io');
// const httpServer = createServer(app);

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router)
app.use(errHandler)


// const io = new Server(httpServer, {
//   cors: {
//     origin: '*',
//   }
// });


const io = socketIO(app);

let userData = [];
let messageData = [];
io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected');
  })

  socket.on('user', (value) => {
    userData.push({
      username: value.username,
      status: 'Online'
    })
    socket.emit('userStatus', userData);
  })

  socket.on('sendingChatMsg', (value) => {
    messageData.push({
      username: value.username,
      message: value.message
    })
    io.emit('gotMessage', messageData)
  })

})
setInterval(() => io.emit('time', new Date().toTimeString()), 1000);


app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
http.listen(PORT, function () {
  console.log(`listening on ${PORT}`);
})
// httpServer.listen(port, () => {
//   console.log(`Web app listening at http://localhost:${port}`);
// })