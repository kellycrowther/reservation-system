import { config } from "../config";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import { db } from "../db/index";

export async function authenticate({ username, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { username } });
  const { secret } = config;

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw "Username or password is incorrect";
  }

  // authentication successful
  const token = jwt.sign({ sub: user.id }, secret, { expiresIn: "7d" });
  return {
    ...omitHash(user.get()),
    token,
  };
}

export async function getAll() {
  return await db.User.findAll();
}

export async function getById(id) {
  return await getUser(id);
}

export async function create(params) {
  if (await db.User.findOne({ where: { username: params.username } })) {
    throw `Username ${params.username} already taken`;
  }

  // hash the password
  if (params.password) {
    params.password = await bcrypt.hash(params.password, 10);
  }

  return await db.User.create(params);
}

export async function update(id, params) {
  const user = await getUser(id);

  const usernameChanged = params.username && user.username !== params.username;
  if (
    usernameChanged &&
    (await db.User.findOne({ where: { username: params.username } }))
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

export async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helpers
async function getUser(id) {
  const user = await db.User.findByPk(id);
  if (!user) {
    throw "User not found";
  }
  return user;
}

function omitHash(user) {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
}
