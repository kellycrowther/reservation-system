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
} = require("../controllers/location.controller");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", createLocationSchema, create);
router.put("/:id", updateLocationSchema, update);
router.delete("/:id", _delete);

module.exports = router;

function createLocationSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function updateLocationSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(""),
  });
  validateRequest(req, next, schema);
}
