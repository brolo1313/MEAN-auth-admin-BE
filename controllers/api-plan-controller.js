const Plan = require("../models/plan");

const errorHandler = (res) =>
  res.status(500).json({
    app_err_default: {
      notification: "Помилка сервера",
      code: 10000,
      message: "Default Error",
    },
  });

const getPlans = (req, res) => {
  Plan.find()
    .then((plans) => {
      // Modify each plan object to change '_id' to 'id'
      const modifiedPlans = plans.map((plan) => {
        const modifiedPlan = { ...plan.toObject(), id: plan._id };
        delete modifiedPlan._id; // Remove the original '_id' field
        return modifiedPlan;
      });
      res.status(200).json(modifiedPlans);
    })
    .catch((error) => {
      errorHandler(res)
    });
};

const createPlan = (req, res) => {
  const { title, details, link, coverImage, logoImage } = req.body;

  const plan = new Plan({ title, details, link, coverImage, logoImage });
  plan
    .save()
    .then((plan) => res.status(200).json(plan))
    .catch((error) => {
      errorHandler(res)
    });
};

const updatePlan = (req, res) => {
  const { title, details, link, coverImage, logoImage } = req.body;

  const { id } = req.params;

  Plan.findByIdAndUpdate(id, { title, details, link, coverImage, logoImage })
    .then((plan) => res.status(200).json(plan))
    .catch((error) => {
      errorHandler(res)
    });
};

const deletePlan = (req, res) => {
  Plan.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => {
      errorHandler(res)
    });
};

module.exports = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
