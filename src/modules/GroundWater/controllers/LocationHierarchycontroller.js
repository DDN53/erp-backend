const Locations = require("../utils/Wells_id");
const db = require("../../../../config/database");
const { getWellsData, createWell,editWellData } = Wells;
const LocationHierarchycontroller = {
   
    viewallwells: async (req, res) => {
      try {
        // First, let's test the database connection
        const [allWells] = await db.query(`
        SELECT 
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
          ORDER BY id DESC
        `);
  
        // If no wells found, return empty array instead of 404
        if (!allWells || allWells.length === 0) {
          return res.status(200).json({
            message: "No province found",
            data: [],
            total: 0
          });
        }
        const wellsData = allWells.map(well => ({
          ...well,
          used: false 
        }));
  
        return res.status(200).json({
          message: " retrieved successfully",
          data: wellsData,
          total: wellsData.length
        });
  
      } catch (err) {
        console.error("Error in viewallwells:", err);
        return res.status(500).json({ 
          error: "Failed to retrieve wells from the database",
          details: err.message,
          stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
      }
    },
  
    viewwell: async (req, res) => {
      try {
        const { newWellNo } = req.params;
        if (!newWellNo) {
          return res.status(400).json({ error: "Missing newWellNo parameter" });
        }
        
        // Use getWellsData to fetch the well data
        const well = await db.query(
          'SELECT * FROM [dbo].[GWM_WellId] WHERE wellNo = :newWellNo',
          { replacements: { newWellNo } }
        );
  
        if (!well[0] || well[0].length === 0) {
          return res.status(404).json({ error: `Well with WELLNO ${newWellNo} not found` });
        }
      
  
        res.status(200).json({
          message: "Well retrieved successfully",
          data: well[0][0],
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve well from the database" });
      }
    },
    editWell: async (req, res) => {
      try {
        const wellNo = req.params.newWellNo;
        const newData = req.body.newData;
  
        if (!wellNo || !newData) {
          return res.status(400).json({ error: "Missing wellNo or newData parameter" });
        }
  
        // Validate foreign key constraints if updating province or district
        if (newData.PROVINCE_CODE || newData.DISTRICT_CODE) {
          const [provinces] = await db.query(
            'SELECT code FROM [dbo].[MDM_LocationHierarchy] WHERE code = :code',
            { replacements: { code: newData.PROVINCE_CODE } }
          );
          
          const [districts] = await db.query(
            'SELECT code FROM [dbo].[MDM_LocationHierarchy] WHERE code = :code',
            { replacements: { code: newData.DISTRICT_CODE } }
          );
  
          if (newData.PROVINCE_CODE && provinces.length === 0) {
            return res.status(400).json({ error: "Invalid PROVINCE_CODE" });
          }
          if (newData.DISTRICT_CODE && districts.length === 0) {
            return res.status(400).json({ error: "Invalid DISTRICT_CODE" });
          }
        }
  
        const updatedWell = await db.query(
          'UPDATE [dbo].[GWM_WellId] SET RSCLocation = :RSCLocation, ScaleGeologyMap = :ScaleGeologyMap, WellType = :WellType, WellCondition = :WellCondition WHERE wellNo = :wellNo',
          { replacements: { wellNo, ...newData } }
        );
  
        if (updatedWell[1] === 0) {
          return res.status(404).json({ error: "Well not found or update failed" });
        }
  
        res.status(200).json({
          message: "Well info updated successfully",
          data: { wellNo, ...newData },
        });
      } catch (err) {
        console.error("Error updating well:", err);
        res.status(500).json({ 
          error: "Failed to update well in the database",
          details: err instanceof AggregateError ? err.errors : err.message
        });
      }
    },
    removeWell: async (req, res) => {
      try {
        const { newWellNo } = req.params;
        if (!newWellNo) {
          return res.status(400).json({ error: "Missing wellNo parameter" });
        }
  
        const result = await db.query(
          'DELETE FROM [dbo].[GWM_WellId] WHERE wellNo = :newWellNo',
          { replacements: { newWellNo } }
        );
  
        if (result[1] === 0) {
          return res.status(404).json({ error: `Well with WELLNO ${newWellNo} not found` });
        }
  
        res.status(200).json({
          message: "Well removed successfully",
          
        });
      } catch (err) {
        console.error("Error removing well:", err);
        res.status(500).json({ 
          error: "Failed to remove well from the database", 
          details: err instanceof AggregateError ? err.errors : err.message
        });
      }
    },
    exportToPDF: async (req, res) => {
      try {
        const { wellData, title = 'Well Report' } = req.body;
        
        // Enhanced validation
        if (!wellData || typeof wellData !== 'object' || Object.keys(wellData).length === 0) {
          return res.status(400).json({ 
            message: 'Invalid well data provided',
            details: 'wellData must be a non-empty object'
          });
        }
    
        const doc = new PDFDocument({ margin: 50 });
        
        // Set response headers with unique filename
        const filename = `well-report-${Date.now()}.pdf`;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        doc.pipe(res);
        
        // Enhanced styling
        const colors = {
          primary: '#1a237e',
          secondary: '#4a148c',
          text: '#212121',
          border: '#9e9e9e',
          background: '#f5f5f5'
        };
        
        // Enhanced header
        doc.fillColor(colors.primary)
           .fontSize(28)
           .font('Helvetica-Bold')
           .text(title, 50, 50, { align: 'center' });
        
        // Add metadata
        doc.moveDown();
        doc.fontSize(10)
           .fillColor(colors.text)
           .text(`Generated: ${new Date().toLocaleString()}`, { align: 'right' });
        
        // Enhanced data display
        let yPosition = 150;
        Object.entries(wellData).forEach(([key, value], index) => {
          if (yPosition > 700) {
            doc.addPage();
            yPosition = 50;
          }
          
          // Background for rows
          if (index % 2 === 0) {
            doc.fillColor(colors.background)
               .rect(50, yPosition - 5, 500, 25)
               .fill();
          }
          
          // Format value based on type
          const displayValue = typeof value === 'object' ? 
            JSON.stringify(value, null, 2) : String(value); // Pretty print JSON
          
          doc.fillColor(colors.secondary)
             .font('Helvetica-Bold')
             .text(`${key}:`, 50, yPosition, { continued: true })
             .fillColor(colors.text)
             .font('Helvetica')
             .text(` ${displayValue}`);
          
          yPosition += 30;
        });
    
        doc.end();
        
      } catch (error) {
        console.error('PDF Generation Error:', error);
        if (!res.headersSent) {
          res.status(500).json({ 
            message: 'Error generating PDF report',
            details: error.message 
          });
        }
      }
    },
    exportToExcel: async (req, res) => {
      try {
        const { wellData, title = 'Well Report' } = req.body;
        
        // Enhanced validation
        if (!wellData || typeof wellData !== 'object' || Object.keys(wellData).length === 0) {
          return res.status(400).json({ 
            message: 'Invalid well data provided',
            details: 'wellData must be a non-empty object'
          });
        }
    
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet(title);
        
        // Style the headers
        const headers = Object.keys(wellData);
        const headerRow = worksheet.addRow(headers);
        headerRow.font = { color: { argb: 'FFFFFF' }, bold: true }; // Moved this line up for clarity
        headerRow.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '2E7D32' }
        };
        
        // Add data with formatting
        const data = Object.values(wellData);
        const dataRow = worksheet.addRow(data);
        
        // Auto-fit columns
        worksheet.columns.forEach(column => {
          column.width = Math.max(
            15,
            Math.max(...headers.map(h => h.length)) + 5
          );
        });
        
        // Add metadata
        worksheet.addRow([]);
        worksheet.addRow(['Generated:', new Date().toLocaleString()]);
        
        // Set response headers with unique filename
        const filename = `well-report-${Date.now()}.xlsx`;
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
        
        await workbook.xlsx.write(res);
        res.end();
        
      } catch (error) {
        console.error('Excel Generation Error:', error);
        if (!res.headersSent) {
          res.status(500).json({ 
            message: 'Error generating Excel report',
            details: error.message 
          });
        }
      }
    }
  };
  
  module.exports = LocationHierarchycontroller;