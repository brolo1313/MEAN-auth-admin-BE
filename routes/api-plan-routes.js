const express = require("express");
const router = express.Router();
const { bearerToken } = require("../middlewares");

const {
  getPlans,
  deletePlan,
  updatePlan,
  createPlan,
} = require("../controllers/api-plan-controller");

router.get("/api/plans", getPlans);
router.post("/api/plan", createPlan);
router.put("/api/plan/:id", updatePlan);
router.delete("/api/plans/:id", deletePlan);

router.use(bearerToken.verify)

module.exports = router;
