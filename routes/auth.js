const express = require("express");
const router = require("express").Router();
const userController = require("../controller/auth");
router.get("/login", userController.getLogin);
router.post("/login", userController.postLogin);
router.post("/signup", userController.postSingup);
router.get("/logout", userController.postLogout);

module.exports = router;
