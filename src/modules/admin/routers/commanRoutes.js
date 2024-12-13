const express = require("express");
const router = express.Router();
const {
  getAllLocations,
  getAllCostCenters,
  getCostCentersByLocation,
  getAllEmployees,
  getEmployee,
  getEmployeeNew,
} = require("../controllers/commanController");

router.get("/locations", getAllLocations);
router.get("/costCenters", getAllCostCenters);
router.get("/costCentersByLocation/:locationId", getCostCentersByLocation);
router.get("/allEmployees", getAllEmployees);
router.get("/employee/:empNumber", getEmployee);
router.get("/employeeNew/:empNo", getEmployeeNew);

module.exports = router;
