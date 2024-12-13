const express = require("express");
const router = express.Router();
const {
  getAllActivities,
} = require("../controllers/auditActivitiesController");

router.get("/getAllActivities", getAllActivities);
module.exports = router;
