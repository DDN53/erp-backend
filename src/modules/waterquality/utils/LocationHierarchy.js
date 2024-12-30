const sequelize = require("../../../../config/database");
const GWM_province = require("../models/GWM_province");




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