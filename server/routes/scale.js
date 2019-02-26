const express = require('express');
const router = express.Router();
const { list, remove, restore, create, update, info } = require('../controllers/scale');
const { sendSuccess } = require('../helpers/success');
const { sendError } = require('../helpers/errors');
const { ERRORS } = require('../constants/errors');

router.get('/list', async (req, res) => {

  const filter = req.query;
  try {
    const result = await list(filter);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.getScaleList);
  };
});

router.get('/info/:id', async (req, res) => {

  const { id } = req.params;
  try {
    const result = await info(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.getScale);
  };
});

router.post('/remove', async (req, res) => {

  const { id } = req.body;
  try {
    const result = await remove(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.removeScale);
  };
});

router.post('/restore', async (req, res) => {

  const { id } = req.body;
  try {
    const result = await restore(id);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.restoreScale);
  };
});

router.post('/create', async (req, res) => {

  const data = req.body;
  try {
    const result = await create(data);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.createScale);
  };
});

router.post('/update/:id', async (req, res) => {

  const { id } = req.params;
  const data   = req.body;
  try {
    const result = await update(id, data);
    sendSuccess(res, result);

  } catch(err) {
    sendError(err, res, ERRORS.updateScale);
  };
});

module.exports = router;
