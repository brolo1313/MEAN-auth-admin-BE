const express = require("express");
const router = express.Router();
const { bearerToken } = require("../middlewares");

const {
  getPlans,
  deletePlan,
  updatePlan,
  createPlan,
} = require("../controllers/api-plan-controller");

router.get("/api/plans", bearerToken.verify, getPlans);
router.post("/api/plan", bearerToken.verify, createPlan);
router.put("/api/plan/:id", bearerToken.verify, updatePlan);
router.delete("/api/plans/:id", bearerToken.verify, deletePlan);

module.exports = router;
