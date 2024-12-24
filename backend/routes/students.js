const express = require('express');
const getStudents = require("../controllers/studentsControllers/allStudents");
const createStudent = require("../controllers/studentsControllers/createStudent");
const router = express.Router();

router.get("/" , getStudents)

router.post("/create" , createStudent)

module.exports = router;
