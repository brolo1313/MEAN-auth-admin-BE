const Plan = require("../models/plan");
const Profile = require("../models/profile");

const errorHandler = (res) =>
  res.status(500).json({
    app_err_default: {
      notification: "Помилка сервера",
      code: 10000,
      message: "Default Error",
    },
  });

const nativeError = (res, error) =>
  res.status(500).json({ message: error.message || "Internal server error" });

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
      errorHandler(res);
    });
};

const createPlan = async (req, res) => {
  const { title, details, link, coverImage, logoImage, authorId } = req.body;

  const plan = new Plan({ title, details, link, coverImage, logoImage });

  try {
    const createPlan = await plan.save();

    await Profile.findOneAndUpdate(
      { user: authorId },
      { $push: { posts: createPlan } }
    );

    res.status(200).json(createPlan);
  } catch (error) {
    return nativeError(res, error);
  }
};

const updatePlan = (req, res) => {
  const { title, details, link, coverImage, logoImage } = req.body;
  const { id } = req.params;

  const options = {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update
  };

  // Perform the update and return the updated document
  Plan.findByIdAndUpdate(
    id,
    { title, details, link, coverImage, logoImage },
    options
  )
    .then((updatedPlan) => {
      if (!updatedPlan) {
        // If the plan with the given id is not found, return a 404 response
        return res.status(404).json({ message: "Plan not found" });
      }
      // Destructure _id and the rest of the properties from updatedPlan
      const { _id, ...restOfPlan } = updatedPlan.toObject();

      // Rename _id to id
      const planWithId = {
        id: _id,
        ...restOfPlan,
      };

      res.status(200).json(planWithId);
    })
    .catch((error) => {
      // Handle errors using your error handler
      errorHandler(res, error);
    });
};

const deletePlan = async (req, res) => {

  try {
    const post = await Plan.findByIdAndDelete(req.params.id);

    if (!post) {
      return nativeError(res, error);
    }

    await Profile.findOneAndUpdate(
      { user: req.query.authorId },
      { $pull: { posts: req.params.id } },
      { new: true } // To return the updated document after removal
    );

    res.status(200).json({
      id: req.params.id,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    return nativeError(res, error);
  }
};

module.exports = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
