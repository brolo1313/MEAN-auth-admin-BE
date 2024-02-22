const express = require("express");
const router = express.Router();

const Plan = require("../models/plan");
const {
  getPlans,
  deletePlan,
  updatePlan,
  createPlan,
} = require("../controllers/plan-controller");

router.get("/plans", getPlans);
router.post("/plan", createPlan);

router.put("/plan/:id", updatePlan);

router.delete("/plans/:id", deletePlan);

module.exports = router;
