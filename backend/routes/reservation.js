const express = require("express");
const router = new express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");

const {
  getAll,
  getById,
  update,
  create,
  _delete,
} = require("../controllers/reservation.controller");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createReservationSchema, create);
router.put("/:id", updateReservationSchema, update);
router.delete("/:id", _delete);

module.exports = router;

function createReservationSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateReservationSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}
