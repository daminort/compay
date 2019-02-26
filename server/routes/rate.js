const express = require('express');
const router = express.Router();
const {
  list,
  remove,
  restore,
  create,
  update,
  latestRate,
  actualRates,
  info,
} = require('../controllers/rate');
const { sendSuccess } = require('../helpers/success');
const { sendError } = require('../helpers/errors');
const { ERRORS } = require('../constants/errors');

router.get('/list', async (req, res) => {

  const filter = req.query;
  try {
    const result = await list(filter);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.getRatesList);
  };
});

router.post('/remove', async (req, res) => {

  const { id } = req.body;
  try {
    const result = await remove(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.removeRate);
  };
});

router.post('/restore', async (req, res) => {

  const { id } = req.body;
  try {
    const result = await restore(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.restoreRate);
  };
});

router.post('/create', async (req, res) => {

  const data = req.body;
  try {
    const result = await create(data);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.createRate);
  };
});

router.post('/update/:id', async (req, res) => {

  const { id } = req.params;
  const data   = req.body;
  try {
    const result = await update(id, data);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.updateRate);
  };
});

router.get('/latest/service/:serviceID/date/:forDate', async (req, res) => {

  const { serviceID, forDate } = req.params;
  try {
    const result = await latestRate(serviceID, forDate);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.getLatestRate);
  };
});

router.get('/actual/date/:forDate', async (req, res) => {

  const { forDate } = req.params;
  try {
    const result = await actualRates(forDate);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.getLatestRate);
  };
});

router.get('/info/:id', async (req, res) => {

  const { id } = req.params;
  try {
    const result = await info(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.getRate);
  };
});

module.exports = router;
