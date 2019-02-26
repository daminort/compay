function sendError(error, res, message = null) {
  console.log(error);

  const errorData = {
    status: 'ERROR',
    data: {
      message: message || error.message,
      error,
    }
  };

  res.send(errorData);
}

module.exports = {
  sendError,
};
