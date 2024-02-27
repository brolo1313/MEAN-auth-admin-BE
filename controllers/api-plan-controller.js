const Plan = require("../models/plan");

const errorHandler = (res, error) => res.status(500).send(error);

const getPlans = (req, res) => {
  Plan.find()
    .then((plans) => res.status(200).json(plans))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

const createPlan = (req, res) => {
  const { title, details, link, coverImage, logoImage } = req.body;

  const plan = new Plan({ title, details, link, coverImage, logoImage });
  plan
    .save()
    .then((plan) => res.status(200).json(plan))
    .catch((error) => {
      errorHandler(res, error);
    });
};

const updatePlan = (req, res) => {
  const { title, details, link, coverImage, logoImage } = req.body;

  const { id } = req.params;

  Plan.findByIdAndUpdate(id, { title, details, link, coverImage, logoImage })
    .then((plan) => res.status(200).json(plan))
    .catch((error) => {
      errorHandler(res, error);
    });
};

const deletePlan = (req, res) => {
  Plan.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json(req.params.id))
    .catch((error) => {
      errorHandler(res, error);
    });
};

module.exports = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
