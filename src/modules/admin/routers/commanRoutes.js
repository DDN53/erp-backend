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

router.get("/GetAllLocations", getAllLocations);
router.get("/GetAllCostCenters", getAllCostCenters);
router.get("/GetLocationWiseCostCenters/:locationId", getCostCentersByLocation);
router.get("/allEmployees", getAllEmployees);
router.get("/employee/:empNumber", getEmployee);
router.get("/employeeNew/:empNo", getEmployeeNew);

module.exports = router;
