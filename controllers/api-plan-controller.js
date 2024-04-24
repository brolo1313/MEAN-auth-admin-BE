const Plan = require("../models/plan");
const Profile = require("../models/profile");
const nativeError  = require("../helpers/errors");

//MAIN LOGIC
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
      return nativeError(res, error);
    });
};

const createPlan = async (req, res) => {
  const { title, details, link, coverImage, logoImage, authorId } = req.body;

  const plan = new Plan({ title, details, link, coverImage, logoImage });

  try {
    const newPlan = await planSave(plan);
    createdPlanId = newPlan._id;
    const updateProfile = await profileUpdate(authorId, newPlan);

    res.status(200).json(newPlan);
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.code === 1100) {
        await Plan.deleteOne({ _id: createdPlanId });
        res.status(400).json({
          message: error.message,
          error: error.cause,
          code: error.code,
        });
      }

      if (error.code === 1201) {
        res.status(400).json({
          message: error.message,
          error: error.cause,
          code: error.code,
        });
      }
    } else {
      return nativeError(
        res,
        error,
        "An error occurred while creating a plan."
      );
    }
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
        return res.status(404).json({ message: "Plan not found" });
      }
      const { _id, ...restOfPlan } = updatedPlan.toObject();

      // Rename _id to id
      const planWithId = {
        id: _id,
        ...restOfPlan,
      };

      res.status(200).json(planWithId);
    })
    .catch((error) => {
      return nativeError(
        res,
        error,
        "An error occurred while updating a plan."
      );
    });
};

const deletePlan = async (req, res) => {
  try {
    deletedPost = await Plan.findById(req.params.id);
    const post = await Plan.findByIdAndDelete(req.params.id);

    if (!post || !deletedPost) {
      return nativeError(res, error);
    }

    await removePostFromProfile(req.query.authorId, req.params.id);

    res.status(200).json({
      id: req.params.id,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    if (error instanceof CustomError) {
      if (error.code === 1203) {
        await Plan.create(deletedPost);

        res.status(500).json({
          message: error.message,
          error: error.cause,
          code: error.code,
        });
      }
    } else {
      return nativeError(
        res,
        error,
        "An error occurred while deleting a plan."
      );
    }
  }
};

//HELPERS
async function planSave(plan) {
  try {
    const newPlan = await plan.save();
    return newPlan;
  } catch (error) {
    throw new CustomError("Couldn't save plan", 1201, error.errors.title.message);
  }
}
async function profileUpdate(authorId, createdPlan) {
  try {
    await Profile.findOneAndUpdate(
      { user: authorId },
      { $push: { posts: createdPlan } }
    );
  } catch (error) {
    throw new CustomError(
      "Failed to update profile. Plan creation rolled back.",
      1100,
      error
    );
  }
}
async function removePostFromProfile(authorId, postId) {
  try {
    await Profile.findOneAndUpdate(
      { user: authorId },
      { $pull: { posts: postId } },
      { new: true } // To return the updated document after removal
    );
  } catch (error) {
    throw new CustomError(
      "Failed to remove post in profile. Plan delete rolled back.",
      1203,
      error
    );
  }
}

module.exports = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};

class CustomError extends Error {
  constructor(message, code = "0000", cause = "Error") {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }
}
