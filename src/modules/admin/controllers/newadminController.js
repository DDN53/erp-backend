const { generateHashPassword } = require("../../../utils/hashUtils");
const {
  ADM_Module,
  ADM_ProcessGroups,
  ADM_ServerUser,
  ADM_Process,
  ADM_TaskList,
  ADM_TaskUser_Mapping,
  MDM_Employee,
} = require("../models");
const crypto = require("crypto");

const adminSignIn = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    const adminUser = await ADM_ServerUser.findOne({
      where: { UserName: UserName },
    });

    if (!adminUser) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const inputPasswordHash = generateHashPassword(
      Password,
      adminUser.PasswordSalt
    );

    const expectedHash = Buffer.from(adminUser.PasswordHash, "base64").toString(
      "base64"
    );

    console.log("Expected Hash:", expectedHash);
    console.log("Generated Hash:", inputPasswordHash);

    if (expectedHash !== inputPasswordHash) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // res.status(200).json({ message: "Login successful" });
    // res.status(200).json({ success: true });
    res.status(200).send(true);
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

const AdminGetAllGroupTasks = async (req, res) => {
  try {
    // Fetch tasks with joins
    const tasks = await ADM_Module.findAll({
      include: [
        {
          model: ADM_ProcessGroups,
          as: "processGroups",
          include: [
            {
              model: ADM_Process,
              as: "process",
              include: [
                {
                  model: ADM_TaskList,
                  as: "task",
                },
              ],
            },
          ],
        },
      ],
    });

    // Function to convert keys to lowercase
    const convertToLowercase = (obj) => {
      const newObj = {};
      Object.keys(obj).forEach((key) => {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        newObj[newKey] = obj[key];
      });
      return newObj;
    };

    // Group and format result with lowercase keys
    const result = tasks.flatMap((module) =>
      module.processGroups.flatMap((group) =>
        group.process.map((process) => ({
          ...convertToLowercase({
            moduleId: module.ModuleId,
            groupId: group.GroupId,
            groupName: group.GroupName,
            processId: process.ProcessId,
            processName: process.ProcessName,
            tasks: process.task
              .sort((a, b) => a.OrderById - b.OrderById)
              .map((task) => convertToLowercase(task.get({ plain: true }))), // Use .get() to convert Sequelize model to plain object
          }),
        }))
      )
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
};

const getAllModules = async (req, res) => {
  try {
    const modules = await ADM_Module.findAll();

    // Modify the keys to have the first letter in lowercase
    const modifiedModules = modules.map((module) => {
      const moduleData = module.toJSON();
      const modifiedModule = {};

      Object.keys(moduleData).forEach((key) => {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        modifiedModule[newKey] = moduleData[key];
      });

      return modifiedModule;
    });

    res.status(200).json(modifiedModules);
    console.log(modifiedModules);
  } catch (error) {
    console.error("Error fetching module data:", error);
    res.status(500).json({ error: "Failed to fetch module data" });
  }
};

// const getAllModules = async (req, res) => {
//   try {
//     const modules = await ADM_Module.findAll();
//     res.status(200).json(modules);
//     console.log(modules);
//   } catch (error) {
//     console.error("Error fetching module data:", error);
//     res.status(500).json({ error: "Failed to fetch module data" });
//   }
// };

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

const getAssignedGroupedTasks = async (req, res) => {
  const { employeeNumber } = req.params;

  try {
    // Find the employee ID based on the employee number
    const employee = await MDM_Employee.findOne({
      where: { EmpNumber: employeeNumber },
      attributes: ["Id"],
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Query the assigned grouped tasks
    const result = await ADM_Module.findAll({
      include: [
        {
          model: ADM_ProcessGroups,
          as: "processGroups",
          include: [
            {
              model: ADM_Process,
              as: "process",
              include: [
                {
                  model: ADM_TaskList,
                  as: "task",
                  include: [
                    {
                      model: ADM_TaskUser_Mapping,
                      as: "taskMappings",
                      where: { EmpId: employee.Id },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // Format the result as needed
    const output = result
      .map((module) => {
        return module.processGroups.map((group) => {
          return group.process.map((process) => {
            return {
              moduleId: module.ModuleId,
              groupId: group.GroupId,
              groupName: group.GroupName,
              processId: process.ProcessId,
              processName: process.ProcessName,
              tasks: process.task
                .sort((a, b) => a.OrderById - b.OrderById)
                .map((task) => ({
                  taskId: task.TaskId,
                  taskName: task.TaskName,
                  orderById: task.OrderById,
                })),
            };
          });
        });
      })
      .flat(2);

    res.status(200).json(output);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  adminSignIn,
  getAllModules,
  getAllProcessGroups,
  getProcessGroupsByModuleId,
  AdminGetAllGroupTasks,
  getAssignedGroupedTasks,
};
