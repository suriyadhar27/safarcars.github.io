const express = require("express");
const router = require("express").Router();
const userController = require("../controller/user");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/contact", isLoggedIn, userController.contactUs);
router.post("/contactus", isLoggedIn, userController.postContactUs);

module.exports = router;
