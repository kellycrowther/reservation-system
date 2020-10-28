const config = require("../config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ username, password }) {
  const user = await User.scope("withHash").findOne({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw "Username or password is incorrect";
  }

  // authentication successful
  const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: "7d" });
  return {
    ...omitHash(user.get()),
    token,
  };
}

async function getAll() {
  return await User.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  if (await User.findOne({ where: { username: params.username } })) {
    throw `Username ${params.username} already taken`;
  }

  // hash the password
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  await User.create(params);
}

async function update(id, params) {
  const user = await getUser(id);

  const usernameChanged = params.username && user.username !== params.username;
  if (
    usernameChanged &&
    (await User.findOne({ where: { username: params.username } }))
  ) {
    throw `Username ${params.username} already taken`;
  }

  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helpers
async function getUser(id) {
  const user = await User.findByPk(id);
  if (!user) {
    throw "User not found";
  }
  return user;
}

function omitHash(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
