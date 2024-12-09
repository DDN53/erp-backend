const express = require("express");
const router = express.Router();
const {
  getAllModules,
  getAllProcessGroups,
  getProcessGroupsByModuleId,
} = require("../controllers/newadminController");

router.get("/allmodules", getAllModules);
router.get("/allprocessgroups", getAllProcessGroups);
// router.get("/allprocessgroupsbymodule", getModuleWithProcessGroups);
router.get("/module/:moduleId/process-groups", getProcessGroupsByModuleId);

module.exports = router;
