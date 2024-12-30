const { Router } = require("express");
const router = Router();
const WellsController = require("../controllers/WellsController")


router.post(
  "/addwell",
  async (req, res) => {
    const { WELLNO, RSCLocation, ScaleGeologyMap, WellType, WellCondition } = req.body;
    if (!WELLNO || !RSCLocation || !ScaleGeologyMap || !WellType || !WellCondition) {
      return res.status(400).json({ error: "Missing required fields!" });
    }
    WellsController.createWell(req,res);
  }
);
router.put(
  "/editwell/:newWellNo",
  async (req, res) => {
    req.body = {
      newWellNo: req.params.newWellNo,
      newData: req.body
    };
    WellsController.editWell(req, res);
  }
);

router.get(
  "/viewallwells",
  async (req, res) => {
    WellsController.viewallwells(req, res);
  }
);

router.get(
  "/viewwell",
  async (req, res) => {
    const { newWellNumber } = req.query; 
    if (!newWellNumber) {
      return res.status(400).json({ error: "Missing newWellNumber query parameter" });
    }
    req.params.newWellNo = newWellNumber;
    const result = await WellsController.viewwell(req, res); 
    return res.status(200).json(result);
  }
);

router.delete(
  "/removewell/:newWellNo",async(req,res)=>{
  WellsController.removeWell(req,res)}
);
router.post('/report/pdf', async (req, res) => {
 WellsController.exportToPDF(req,res);
});

router.post('/report/excel', async (req, res) => {
WellsController.exportToExcel(req,res);
});



module.exports = router;
