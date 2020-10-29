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
} = require("../controllers/activity.controller");
import { authorize } from "../_middleware/authorize";

router.get("/", getAll);
router.get("/my", authorize(), getAllByUser);
router.get("/:id", getById);
router.post("/", createActivitySchema, create);
router.put("/:id", updateActivitySchema, update);
router.delete("/:id", _delete);

module.exports = router;

function createActivitySchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateActivitySchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}
