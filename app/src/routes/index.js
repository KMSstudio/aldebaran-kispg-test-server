"use strict"

const express = require("express");
const router = express.Router();

const ctrl = require("./home.ctrl");

router.get("/", ctrl.output.root);
router.post("/submit", ctrl.process.submit);

module.exports = router;