import * as express from "express";
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");

const {
  getAll,
  getById,
  update,
  create,
  _delete,
  getAllByUser,
} = require("../controllers/reservation.controller");
import { authorize } from "../_middleware/authorize";

router.get("/", getAll);
router.get("/me", authorize(), getAllByUser);
router.get("/:id", getById);
router.post("/", createReservationSchema, create);
router.put("/:id", updateReservationSchema, update);
router.delete("/:id", _delete);

module.exports = router;

function createReservationSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    userId: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateReservationSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}
