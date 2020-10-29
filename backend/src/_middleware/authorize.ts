import * as jwt from "express-jwt";
import { config } from "../config";
import { db } from "../db/index";

export function authorize() {
  const { secret } = config;
  return [
    // authenticate and attach the token
    jwt({ secret, algorithms: ["HS256"] }),

    async (req, res, next) => {
      const user = await db.User.findByPk(req.user.sub);

      if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      req.user = user.get();
      next();
    },
  ];
}
