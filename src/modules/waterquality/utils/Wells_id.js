const sequelize = require("../../../../config/database");
const GWM_WellId = require("../models/GWM_WellId");

async function createWell(wellData) {
  try {
    // Allow WELLNO as the only required field
    const requiredFields = ["WELLNO"];
    const missingFields = requiredFields.filter((field) => !wellData[field]);

    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Prepare the well data for insertion
    const formattedData = {
      wellNo: wellData.WELLNO,
      // Set default values for other fields if not provided
      oldWellNo: wellData.OLDWELLNO || null,
      nWellNo: wellData.NWELLNO || null,
      projOfficeCode: wellData.PROJOFFICE_CODE || null,
      provinceCode: wellData.PROVINCE_CODE || null,
      districtCode: wellData.DISTRICT_CODE || null,
      dsDivision: wellData.DSDIV_CODE || null,
      gsDivision: wellData.GSDIV || null,
      electDivision: wellData.ELECT_CODE || null,
      village: wellData.VILLAGE || null,
      location: wellData.LOCATION || null,
      xCoordinate: wellData.X_COORDINATE || null,
      yCoordinate: wellData.Y_COORDINATE || null,
      mapUsed: wellData.MAP_USED || null,
      mapScale: wellData.MAP_SCALE || null,
      geologicalUsed: wellData.GEOLOGICAL_USED || null,
      geologicalScale: wellData.GEOLOGICAL_SCALE || null,
      xMetric: wellData.X_METRIC || null,
      yMetric: wellData.Y_METRIC || null,
      elevationMsl: wellData.ELEVATIONMSL || null,
      userType: wellData.USERTYPE || null,
      schemeName: wellData.SCHEMENAME || null,
      source: wellData.SOURCE || null,
      elvMethod: wellData.ELV_METHOD || null,
      depSoil: wellData.DEP_SOIL || null,
      depHwRock: wellData.DEP_HW_ROCK || null,
      depWRock: wellData.DEP_W_ROCK || null,
      geol: wellData.GEOL || null,
      isLock: wellData.IsLock || null,
      RSCLocation: wellData.RSCLocation || null,
      ScaleGeologyMap: wellData.ScaleGeologyMap || null,
      WellType: wellData.WellType || null,
      WellCondition: wellData.WellCondition || null,
      Elevation1: wellData.Elevation1 || null,
      Elevation2: wellData.Elevation2 || null,
    };

    // Save to the database
    const result = await GWM_WellId.create(formattedData);

    return {
      success: true,
      message: "Well data saved successfully",
      wellNo: result.wellNo,
    };
  } catch (error) {
    console.error("Error creating well:", error);
    return {
      success: false,
      message: "Error creating well: " + error.message,
    };
  }
}


async function getWellsData() {
  try {
    await sequelize.authenticate();

    const [results] = await sequelize.query(`
      SELECT TOP 1000
        w.id,
        w.wellNo,
        w.oldWellNo,
        w.nWellNo,
        w.projOfficeCode,
        w.provinceCode,
        w.districtCode,
        w.dsDivision,
        w.gsDivision,
        w.electDivision,
        w.village,
        w.location,
        w.xCoordinate,
        w.yCoordinate,
        w.mapUsed,
        w.mapScale,
        w.geologicalUsed,
        w.geologicalScale,
        w.xMetric,
        w.yMetric,
        w.elevationMsl,
        w.userType,
        w.schemeName,
        w.source,
        w.elvMethod,
        w.depSoil,
        w.depHwRock,
        w.depWRock,
        w.geol,
        w.isLock,
        lh.provinceName,
        lh.district,
        lh.projOffice
      FROM [dbo].[GWM_WellId] w
      JOIN [dbo].[MDM_LocationHierarchy] lh ON w.projOfficeCode = lh.projOfficeCode
      ORDER BY w.id DESC
    `);

    return results;
  } catch (error) {
    console.error("Error in getWellsData:", error);
    throw error;
  }
}

async function getWellData(newWellNo) { 
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    const [results] = await sequelize.query(`
      SELECT TOP (10000) 
        id,
        wellNo,
        oldWellNo,
        nWellNo,
        projOfficeCode,
        provinceCode,
        districtCode,
        dsDivision,
        gsDivision,
        electDivision,
        village,
        location,
        xCoordinate,
        yCoordinate,
        mapUsed,
        mapScale,
        geologicalUsed,
        geologicalScale,
        xMetric,
        yMetric,
        elevationMsl,
        userType,
        schemeName,
        source,
        elvMethod,
        depSoil,
        depHwRock,
        depWRock,
        geol,
        isLock
      FROM [dbo].[GWM_WellId]
      WHERE wellNo = :wellNo
    `, {
      replacements: { wellNo: newWellNo }
    });

    console.log(results);
    return results;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function editWellData(newWellNo, updatedData) {
  try {
    const updateFields = [];
    const values = [];
    
    const possibleFields = [
      'oldWellNo', 'nWellNo', 'projOfficeCode', 'provinceCode', 
      'districtCode', 'dsDivision', 'gsDivision', 'electDivision', 
      'village', 'location', 'xCoordinate', 'yCoordinate', 
      'mapUsed', 'mapScale', 'geologicalUsed', 'geologicalScale', 
      'xMetric', 'yMetric', 'elevationMsl', 'userType', 
      'schemeName', 'source', 'elvMethod', 'depSoil', 
      'depHwRock', 'depWRock', 'geol', 'isLock',
      'RSCLocation', 'ScaleGeologyMap', 'WellType', 'WellCondition'
    ];

    possibleFields.forEach(field => {
      if (updatedData[field] !== undefined) {
        updateFields.push(`${field} = ?`);
        values.push(updatedData[field]);
      }
    });

    values.push(newWellNo);

    const query = `
      UPDATE [dbo].[GWM_WellId] 
      SET ${updateFields.join(', ')}
      WHERE wellNo = ?
    `;

    console.log("Query:", query);
    console.log("Values:", values);

    const [results] = await sequelize.query(query, { replacements: values });
    return results;
  } catch (error) {
    console.error("Error updating well:", error);
    throw error;
  }
}

async function deleteWellData(newWellNo) {
  try {
    const query = `
      DELETE FROM [dbo].[GWM_WellId] WHERE wellNo = :newWellNo
    `;

    console.log("Value for SQL query:", newWellNo);

    const result = await sequelize.query(query, {
      replacements: { newWellNo },
      type: sequelize.QueryTypes.DELETE
    });

    if (result[0] === 0) {
      throw new Error(`Well with WELLNO ${newWellNo} not found.`);
    }

    return result;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
}

// Export the functions
module.exports = {
  getWellsData,
  createWell,
  getWellData,
  editWellData,
  deleteWellData
};