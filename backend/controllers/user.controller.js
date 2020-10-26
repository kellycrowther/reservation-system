const userService = require("../services");

module.exports = {
  authenticate,
  register,
  getAll,
  getCurrent,
  getById,
  update,
  _delete,
};

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then(() => res.json({ message: "Registration successful" }))
    .catch(next);
}

function getAll(req, res, next) {
  userService
    .getAll()
    .then((users) => res.json(users))
    .catch(next);
}

function getCurrent(req, res, next) {
  res.json(req.user);
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => res.json(user))
    .catch(next);
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then((user) => res.json(user))
    .catch(next);
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch(next);
}
