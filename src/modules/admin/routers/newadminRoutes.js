const express = require("express");
const router = express.Router();
const {
  adminSignIn,
  getAllModules,
  getAllProcessGroups,
  getProcessGroupsByModuleId,
  AdminGetAllGroupTasks,
} = require("../controllers/newadminController");

router.post("/LoginAdmin", adminSignIn);
router.get("/GetAdminModules", getAllModules);
router.get("/allprocessgroups", getAllProcessGroups);
router.get("/AdminGetAllGroupTasks", AdminGetAllGroupTasks);
// router.get("/allprocessgroupsbymodule", getModuleWithProcessGroups);
router.get("/module/:moduleId/process-groups", getProcessGroupsByModuleId);

module.exports = router;
