// const { ADM_Module } = require("../models/ADM_Module");
// const { ADM_ProcessGroups } = require("../models/ADM_ProcessGroups");
const { ADM_Module, ADM_ProcessGroups } = require("../models");

const getAllModules = async (req, res) => {
  try {
    const modules = await ADM_Module.findAll();
    res.status(200).json(modules);
    console.log(modules);
  } catch (error) {
    console.error("Error fetching module data:", error);
    res.status(500).json({ error: "Failed to fetch module data" });
  }
};

const getAllProcessGroups = async (req, res) => {
  try {
    const modules = await ADM_ProcessGroups.findAll();
    res.status(200).json(modules);
    console.log(modules);
  } catch (error) {
    console.error("Error fetching module data:", error);
    res.status(500).json({ error: "Failed to fetch module data" });
  }
};

const getProcessGroupsByModuleId = async (req, res) => {
  try {
    const { moduleId } = req.params;

    const moduleData = await ADM_Module.findOne({
      where: { ModuleId: moduleId },
      include: {
        model: ADM_ProcessGroups,
        as: "processGroups",
      },
    });

    if (!moduleData) {
      return res.status(404).json({
        message: "Module not found",
      });
    }

    res.status(200).json({
      success: true,
      data: moduleData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  getAllModules,
  getAllProcessGroups,
  getProcessGroupsByModuleId,
};
