const express = require('express');
const { createUser, loginUser, viewUsers, deleteUser } = require('./controller');
const { protect } = require('../../middleware/authMiddleware');

const UserRouter = express.Router();

UserRouter.post('/createuser',protect, createUser);
UserRouter.post('/loginuser', loginUser);
UserRouter.get('/',protect, viewUsers);
UserRouter.delete('/:username',protect, deleteUser);

module.exports = UserRouter;