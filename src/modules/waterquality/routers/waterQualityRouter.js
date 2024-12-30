const express = require('express');
const router = express.Router();
const waterQualityController = require('../controllers/WaterQualityController');


router.post('/save', waterQualityController.saveWaterqualityData);
router.get('/view', waterQualityController.getAll);
router.get('/:id', waterQualityController.getOne);
router.put('/:id', waterQualityController.update);
router.delete('/:id', waterQualityController.delete);
router.put('/waterquality', waterQualityController.updateAll);

module.exports = router;