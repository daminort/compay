const express = require('express');
const router = express.Router();
const { list, remove, restore, update, info } = require('../controllers/service');
const { sendSuccess } = require('../helpers/success');
const { sendError } = require('../helpers/errors');
const { ERRORS } = require('../constants/errors');

router.get('/list', async (req, res) => {

  const filter = req.query;
  try {
    const result = await list(filter);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.getServicesList);
  };
});

router.post('/remove', async (req, res) => {

  const { id } = req.body;
  try {
    const result = await remove(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.removeService);
  };
});

router.post('/restore', async (req, res) => {

  const { id } = req.body;
  try {
    const result = await restore(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.restoreService);
  };
});

router.post('/update/:id', async (req, res) => {

  const { id } = req.params;
  const data   = req.body;
  try {
    const result = await update(id, data);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.updateService);
  };
});

router.get('/info/:id', async (req, res) => {

  const { id } = req.params;
  try {
    const result = await info(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.serviceNotFound);
  };
});

module.exports = router;