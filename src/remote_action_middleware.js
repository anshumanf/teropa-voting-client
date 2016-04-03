/* eslint-disable no-unused-vars */
export default socket => store => next => action => {
/* eslint-enable no-unused-vars */
  if(action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
  return next(action);
};
