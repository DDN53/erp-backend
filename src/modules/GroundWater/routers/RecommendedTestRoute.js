const express = require('express');
const router = express.Router();
const GWM_RecommendedTest = require('../models/GWM_RecommendedTest');

// Create a new recommended test record
router.post('/recommendedtest', async (req, res) => {
  try {
    const recommendedTestData = await GWM_RecommendedTest.create(req.body);
    res.status(201).json(recommendedTestData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all recommended test records
router.get('/tests', async (req, res) => {
  try {
    const recommendedTests = await GWM_RecommendedTest.findAll();
    res.status(200).json(recommendedTests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific recommended test record by ID
router.get('/:id', async (req, res) => {
  try {
    const recommendedTest = await GWM_RecommendedTest.findByPk(req.params.id);
    if (recommendedTest) {
      res.status(200).json(recommendedTest);
    } else {
      res.status(404).json({ error: 'Recommended Test Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a recommended test record
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await GWM_RecommendedTest.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedRecommendedTest = await GWM_RecommendedTest.findByPk(req.params.id);
      res.status(200).json(updatedRecommendedTest);
    } else {
      res.status(404).json({ error: 'Recommended Test Data not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a recommended test record
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await GWM_RecommendedTest.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(200).json({ message: 'Delete Recommended Test Data Succesfully' });
    } else {
      res.status(404).json({ error: 'Recommended Test Data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 