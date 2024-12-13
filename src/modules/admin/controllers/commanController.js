const { where } = require("sequelize");
const db = require("../../../../config/database");
const { QueryTypes } = require("sequelize");
const { sequelize } = require("../models");
const {
  MDM_SHR_WorkLocation,
  MDM_SHR_WorkLocationType,
  MDM_SHR_CostCentre,
  MDM_SHR_WorkLocation_CostCentre_Mapping,
  MDM_Employee,
  MDM_DesignationJobRole,
  MDM_OfficeActType,
} = require("../models");

const getAllLocations = async (req, res) => {
  try {
    const locations = await MDM_SHR_WorkLocation.findAll({
      include: [
        {
          model: MDM_SHR_WorkLocationType,
          as: "locationType",
          attributes: ["name"],
        },
      ],
    });

    // Format the response
    const formattedLocations = locations.map((location) => {
      const locationData = location.toJSON();
      return {
        id: locationData.Id,
        name: locationData.Name || "",
        address: locationData.Address || "",
        locationType: locationData.locationType?.name || "",
      };
    });

    res.status(200).json(formattedLocations);
  } catch (error) {
    console.error("Error fetching location data:", error);
    res.status(500).json({ error: "Failed to fetch location data" });
  }
};

const getAllCostCenters = async (req, res) => {
  try {
    const costCenters = await MDM_SHR_CostCentre.findAll();

    // Convert keys to lowercase
    const modifiedCostCenters = costCenters.map((costCenter) => {
      const costCenterData = costCenter.toJSON();
      const modifiedCostCenter = {};

      Object.keys(costCenterData).forEach((key) => {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        modifiedCostCenter[newKey] = costCenterData[key];
      });

      return modifiedCostCenter;
    });

    res.status(200).json(modifiedCostCenters);
    console.log(modifiedCostCenters);
  } catch (error) {
    console.error("Error fetching cost centers:", error);
    res.status(500).json({ error: "Failed to fetch cost centers" });
  }
};

const getCostCentersByLocation = async (req, res) => {
  try {
    const { locationId } = req.params;

    if (!locationId) {
      return res.status(400).json({ error: "Location ID is required" });
    }

    const costCenters = await MDM_SHR_WorkLocation_CostCentre_Mapping.findAll({
      where: { LocationId: locationId },
      include: [
        {
          model: MDM_SHR_CostCentre,
          as: "costCentre",
          attributes: [
            "Id",
            "CostCentreCode",
            "CostCentreName",
            "ConsolidationLocationID",
            "IsTransfer",
            "IsProjects",
            "IsExpired",
            "CadreNormId",
          ],
        },
      ],
    });

    if (costCenters.length === 0) {
      return res
        .status(404)
        .json({ message: "No cost centers found for this location" });
    }

    // Map results to lowercased keys
    const modifiedCostCenters = costCenters.map((item) => {
      const costCentreData = item.costCentre.toJSON();
      const modifiedCostCentre = {};

      Object.keys(costCentreData).forEach((key) => {
        const newKey = key.charAt(0).toLowerCase() + key.slice(1);
        modifiedCostCentre[newKey] = costCentreData[key];
      });

      return modifiedCostCentre;
    });

    res.status(200).json(modifiedCostCenters);
  } catch (error) {
    console.error("Error fetching cost centers by location:", error);
    res.status(500).json({ error: "Failed to fetch cost centers by location" });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await MDM_Employee.findAll({
      attributes: [
        "Id",
        "EmpNumber",
        "EmpName",
        "Basic",
        "EmpTypeId",
        "DsgnId",
        "BoardGradeId",
        "EmpStatusId",
        "DeptId",
        "LocationId",
        "CostCenterId",
        "PayStatus",
        "IsTransfer",
        "OffcActTypeId",
        "SalCodeId",
        "SalaryScaleCasualId",
        "SOBoardId",
        "SODesgnId",
        "DepartmentStructId",
        "IsCompensatoryAllow",
        "IsTaxconcessioned",
        "JobRoleId",
      ],
    });

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    const formattedEmployees = employees.map((employee) => {
      const employeeData = employee.toJSON();
      const formattedEmployee = {};

      // Convert keys to lowercase
      Object.keys(employeeData).forEach((key) => {
        formattedEmployee[key.charAt(0).toLowerCase() + key.slice(1)] =
          employeeData[key];
      });

      return formattedEmployee;
    });

    res.status(200).json(formattedEmployees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { empNumber } = req.params;

    if (!empNumber) {
      return res.status(400).json({ error: "Employee number is required" });
    }

    const employees = await MDM_Employee.findAll({
      where: { EmpNumber: empNumber },
      attributes: [
        "Id",
        "EmpNumber",
        "EmpName",
        "Basic",
        "EmpTypeId",
        "DsgnId",
        "BoardGradeId",
        "EmpStatusId",
        "DeptId",
        "LocationId",
        "CostCenterId",
        "PayStatus",
        "IsTransfer",
        "OffcActTypeId",
        "SalCodeId",
        "SalaryScaleCasualId",
        "SOBoardId",
        "SODesgnId",
        "DepartmentStructId",
        "IsCompensatoryAllow",
        "IsTaxconcessioned",
        "JobRoleId",
      ],
    });

    if (employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }

    const formattedEmployees = employees.map((employee) => {
      const employeeData = employee.toJSON();
      const formattedEmployee = {};

      // Convert keys to lowercase
      Object.keys(employeeData).forEach((key) => {
        formattedEmployee[key.charAt(0).toLowerCase() + key.slice(1)] =
          employeeData[key];
      });

      return formattedEmployee;
    });

    res.status(200).json(formattedEmployees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

// const getEmployeeNew = async (req, res) => {
//   try {
//     const employees = await sequelize.query("SELECT * FROM MDM_Employee");
//     res.status(200).json(employees);
//   } catch (error) {
//     console.error("Error fetching employee data:", error);
//     res.status(500).json({ error: "Failed to fetch employee data" });
//   }
// };

const getEmployeeNew = async (req, res) => {
  const { empNo } = req.params; // Get empNo from URL parameters

  // Check if empNo is provided
  if (!empNo) {
    return res
      .status(400)
      .json({ message: "Employee number cannot be null or empty." });
  }
  console.log("Received empNo:", empNo);
  // Raw SQL query to fetch employee details
  const query = `
  SELECT TOP 1
    personal.EmployeeNumber AS EmpNo,
    personal.EmployeeName AS EmpName,
    employee.BoardGradeId AS BoardGrade,
    designation.Description AS Designation,
    designationCategory.Description AS DesignationCategory,
    employee.EmpTypeId AS EmployeeTypeId,
    empType.Description AS EmployeeType,
    employee.EmpStatusId AS EmployeeStatusId,
    empStatus.Description AS EmployeeStatus,
    location.Description AS EmpLocation,
    costCenter.CostCentreName AS EmpCostCenter,
    personal.DateOfBirth AS dob,
    personal.AnticipatedDateOfRetirement AS SystemRetirement,
    personal.AppointmentDate AS PermanentAppointment,
    personal.EmployeeFullName AS FullName,
    salaryCode.SalCode AS SalaryCode,
    personal.Gender,
    contact.MobileNo AS Mobile,
    contact.EmailId AS Email,
    ss.Nicnumber
  FROM
    MDM_Employee AS employee
  INNER JOIN
    HRM_EmpPersonal AS personal ON employee.EmpNumber = personal.EmployeeNumber
  LEFT JOIN
    HRM_EmpContact AS contact ON personal.Pkey = contact.EmpPersonalId
  INNER JOIN
    MDM_SalaryCode AS salaryCode ON employee.SalCodeId = salaryCode.Pkey
  INNER JOIN
    MDM_Designation AS designation ON employee.DsgnId = designation.Id
  INNER JOIN
    MDM_DesignationCategory AS designationCategory ON designation.DsgnCtgryId = designationCategory.Id
  INNER JOIN
    MDM_SHR_CostCentre AS costCenter ON employee.CostCenterId = costCenter.Id
  INNER JOIN
    MDM_SHR_WorkLocation AS location ON employee.LocationId = location.Id
  INNER JOIN
    MDM_EmployeeType AS empType ON employee.EmpTypeId = empType.Id
  INNER JOIN
    MDM_EmployeeStatus AS empStatus ON employee.EmpStatusId = empStatus.Id
  LEFT JOIN
    HRM_EmpSocialSecurity AS ss ON personal.Pkey = ss.EmpPersonalId
  WHERE
    employee.EmpNumber = :empNo
    AND (employee.EmpStatusId IN (1, 3)) 
    AND (employee.EmpTypeId IN (1, 3))
  `;

  try {
    // Execute raw query with empNo parameter
    const [results] = await sequelize.query(query, {
      replacements: { empNo },
      type: QueryTypes.SELECT, // Ensure the query returns the data
    });

    // If no results found, return 404 error
    if (!results || results.length === 0) {
      return res
        .status(404)
        .json({ message: `No employee found with EmpNo = ${empNo}` });
    }

    // Since results will be an array, we take the first element if it's the only one
    const result = results[0];
    console.log("Query results:", results[0]);

    return res.status(200).json(results); // Return the result in JSON format
  } catch (error) {
    console.error("Error executing raw SQL query:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllLocations,
  getAllCostCenters,
  getCostCentersByLocation,
  getAllEmployees,
  getEmployee,
  getEmployeeNew,
};
