const jwt = require("express-jwt");
const { secret } = require("../config.json");
const db = require("../db/index");

module.exports = authorize;

function authorize() {
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
