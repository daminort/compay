const express = require('express');
const router = express.Router();
const { sendSuccess } = require('../helpers/success');
const { sendError } = require('../helpers/errors');
const { ERRORS } = require('../constants/errors');
const {
  list,
  remove,
  create,
  createMany,
  update,
  updateStatus,
  updateStatusMany,
  updateMany,
} = require('../controllers/calculation');

router.get('/list', async (req, res) => {

  const filter = req.query;
  try {
    const result = await list(filter);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.getCalculationsList);
  };
});

router.post('/remove', async (req, res) => {

  const { id } = req.body;
  try {
    const result = await remove(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.removeCalculation);
  };
});

router.post('/create', async (req, res) => {

  const data = req.body;
  try {
    const result = await create(data);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.createCalculation);
  };
});

router.post('/createMany', async (req, res) => {

  const { period } = req.body;
  try {
    const result = await createMany(period);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.createCalculation);
  };
});

router.post('/update/:id', async (req, res) => {

  const { id } = req.params;
  const data   = req.body;
  try {
    const result = await update(id, data);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.updateCalculation);
  };
});

router.post('/updateStatus/:id', async (req, res) => {

  const { id }       = req.params;
  const { statusID } = req.body;
  try {
    const result = await updateStatus(id, statusID);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.updateCalculation);
  };
});

router.post('/updateStatusMany', async (req, res) => {

  const { IDs, statusID } = req.body;
  try {
    const result = await updateStatusMany(IDs, statusID);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.updateCalculation);
  };
});

router.post('/updateMany', async (req, res) => {

  try {
    const result = await updateMany(req.body);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.updateCalculation);
  };
});

module.exports = router;
