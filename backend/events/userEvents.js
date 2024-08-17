const { v4: uuidv4 } = require('uuid');

const {
  saveSession,
  findSession,
  findAllSessions,
  updateSession,
} = require('../sessionManager');
const {
  saveMessage,
  getMessageForSession,
  clearMessagesForSession,
} = require('../messageStorage');

let sessions = new Map();

module.exports = (io, socket) => {
  socket.on('login', (username, callback) => {
    const sessionId = uuidv4();
    sessions = saveSession(socket.id, sessionId, username);
    // console.log(sessions);

    callback({ success: true, sessionId });
    io.emit('updateUserList', findAllSessions());
  });

  socket.on('reconnect', (sessionId, callback) => {
    const session = findSession(sessionId);
    if (session) {
      session.socketId = socket.id;
      session.online = true;
      sessions.set(sessionId, session);

      io.emit('updateUserList', findAllSessions());

      const storedMessages = getMessageForSession(sessionId);
      storedMessages.forEach(({ from, message }) => {
        socket.emit('receiveMessage', { from, to: sessionId, message });
      });

      clearMessagesForSession(sessionId);

      callback({ success: true, username: session.username });
    } else {
      callback({ success: false, message: 'Session not found' });
    }
  });

  socket.on('privateMessage', ({ from, to, message }) => {
    const targetSession = findSession(to);
    if (targetSession && targetSession.online) {
      io.to(targetSession.socketId).emit('receiveMessage', {
        from,
        to,
        message,
      });
    } else {
      saveMessage(to, from, message);
      socket.emit('notification', {
        to,
        message:
          'User is offline. Message will be delivered when they reconnect.',
      });
    }
  });

  socket.on('typing', ({ to, typing }) => {
    const targetSession = findSession(to);
    const fromSession = Array.from(sessions.values()).find(
      (session) => session.socketId === socket.id
    );

    if (fromSession && targetSession && targetSession.online) {
      fromSession.typing = typing;
      sessions.set(fromSession.sessionId, fromSession);

      io.to(targetSession.socketId).emit('display', {
        username: fromSession.username,
        typing,
      });
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    for (let [sessionId, session] of sessions) {
      if (session.socketId === socket.id) {
        session.online = false;
        session.typing = false;
        sessions.set(sessionId, session);
        break;
      }
    }
    io.emit('updateUserList', findAllSessions());
  });

  socket.on('requestUserList', (callback) => {
    const session = findSession(socket.id);
    if (session) {
      const otherOnlineUsers = findAllSessions().filter(
        (user) => user.sessionId !== session.sessionId && user.online
      );
      callback(otherOnlineUsers);
    }
  });
};
