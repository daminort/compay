function sendSuccess(res, data) {

  const successData = {
    status: 'OK',
    data,
  };

  res.send(successData);
};

module.exports = {
  sendSuccess,
};