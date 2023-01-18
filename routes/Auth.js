const express = require('express');
const Route = express.Router();
const RouteName = '/auth'
const AuthController = require('../controllers/AuthController');
Route.get(RouteName+'/',AuthController.index);
Route.post(RouteName+'/getToken/:username',AuthController.getToken);
Route.get(RouteName+'/users/:username',AuthController.getUserByUsername);
Route.post(RouteName+'/checkAuthen',AuthController.checkAuthen);
Route.post(RouteName+'/register',AuthController.register);
Route.post(RouteName+'/login',AuthController.login);
module.exports = Route