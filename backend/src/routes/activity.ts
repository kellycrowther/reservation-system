import * as express from "express";
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request");

import {
  getAll,
  getById,
  update,
  create,
  _delete,
  getAllByUser,
  getCalendar,
} from "../controllers/activity.controller";
import { authorize } from "../_middleware/authorize";

router.get("/", getAll);
router.get("/my", authorize(), getAllByUser);
router.get("/:id", getById);
router.post("/", createActivitySchema, create);
router.put("/:id", updateActivitySchema, update);
router.delete("/:id", _delete);
router.get("/:id/calendar", getCalendar);

module.exports = router;

function createActivitySchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().required(),
    schedule: Joi.object({
      standard: Joi.array()
        .items({
          name: Joi.string().required(),
          description: Joi.string(),
          startTime: Joi.string().required(),
          endTime: Joi.string().required(),
          weekdays: Joi.array().items({
            day: Joi.number().required(),
          }),
          hours: Joi.array().items({
            hour: Joi.number().required(),
            minutes: Joi.number().required(),
          }),
        })
        .required(),
      exception: Joi.array().items({
        name: Joi.string().required(),
        description: Joi.string(),
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        weekdays: Joi.array().items({
          day: Joi.number().required(),
        }),
        hours: Joi.array().items({
          hour: Joi.number().required(),
          minutes: Joi.number().required(),
        }),
      }),
    }),
  });
  validateRequest(req, next, schema);
}

function updateActivitySchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().empty(""),
    schedule: Joi.object({
      standard: Joi.array()
        .items({
          name: Joi.string().empty(""),
          description: Joi.string().empty(""),
          startTime: Joi.string().empty(""),
          endTime: Joi.string().empty(""),
          weekdays: Joi.array().items({
            day: Joi.number().empty("").allow(null),
          }),
          hours: Joi.array().items({
            hour: Joi.number().empty(""),
            minutes: Joi.number().empty(""),
          }),
        })
        .required(),
      exception: Joi.array().items({
        name: Joi.string().empty(""),
        description: Joi.string().empty(""),
        startTime: Joi.string().empty(""),
        endTime: Joi.string().empty(""),
        weekdays: Joi.array().items({
          day: Joi.number().empty("").allow(null),
        }),
        hours: Joi.array().items({
          hour: Joi.number().empty(""),
          minutes: Joi.number().empty(""),
        }),
      }),
    }),
  });
  validateRequest(req, next, schema);
}
