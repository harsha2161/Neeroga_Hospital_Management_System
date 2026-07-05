const express = require('express');
const UserRouter = require('../modules/users/route');

const AppRoute = express.Router()

AppRoute.use("/users", UserRouter)


AppRoute.use("/users", UserRouter)

module.exports = AppRoute;