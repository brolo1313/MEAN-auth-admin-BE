const Plan = require("../models/plan");

const getPlans = (req, res) => {
  Plan.find()
    .then((planList) => res.send(planList))
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
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

const updatePlan = (req, res) => {
  const { title, details, link, coverImage, logoImage } = req.body;

  const { id } = req.params;

  Plan.findByIdAndUpdate(id, { title, details, link, coverImage, logoImage })
    .then((result) => res.status(200).send(result))
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

const deletePlan = (req, res) => {
  Plan.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};

module.exports = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
