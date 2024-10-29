const express = require("express");
const router = express.Router();
const { validateDateParams } = require("../middleware/validators");
const { retentionService } = require("../services/retentionService");

router.get("/monthly", validateDateParams, async (req, res, next) => {
  const { referenceDate, endDate } = req.query;

  try {
    const result = await retentionService.getMonthlyRetention(referenceDate, endDate);
    res.json(result);
  } catch (error) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;