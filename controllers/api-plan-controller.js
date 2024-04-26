const Plan = require("../models/plan");
const Profile = require("../models/profile");
const { AppError } = require("../helpers/errors");
const Result = require("../helpers/result");
const { findById, deleteById, save } = require("../helpers/default-db-actions");

//MAIN LOGIC
const getPlans = (req, res, next) => {
  Plan.find()
    .then((plans) => {
      const modifiedPlans = plans.map((plan) => {
        const modifiedPlan = { ...plan.toObject(), id: plan._id };
        delete modifiedPlan._id;
        return modifiedPlan;
      });
      res.status(200).json(modifiedPlans);
    })
    .catch((error) => {
      next(error);
    });
};

const createPlan = async (req, res, next) => {
  const { title, details, link, coverImage, logoImage, authorId } = req.body;

  const plan = new Plan({ title, details, link, coverImage, logoImage });
  plan.plan_manager = authorId;

  try {
    const newPlan = await save(plan);
    if (newPlan.error) {
      throw new AppError("Couldn't save plan", 500, 1201, newPlan.error);
    }
    createdPlanId = newPlan.data._id;
    const updateProfile = await profileUpdate(authorId, newPlan.data);

    if (updateProfile.error) {
      console.log("updateProfile", updateProfile);
      await Plan.deleteOne({ _id: createdPlanId });
      throw new AppError(
        "Failed to update profile. Plan creation rolled back.",
        500,
        1100,
        updateProfile.error
      );
    }
    
    res.status(200).json(newPlan.data);
  } catch (error) {
    next(error);
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
      const { _id, ...restOfPlan } = updatedPlan.toObject();

      // Rename _id to id
      const planWithId = {
        id: _id,
        ...restOfPlan,
      };

      res.status(200).json(planWithId);
    })
    .catch((error) => {
      next(error);
    });
};

const deletePlan = async (req, res, next) => {
  const authorId = req.query.authorId;
  try {
    post = await findById(req?.params?.id, Plan);

    if(post?.data?.plan_manager?.toString() != authorId?.toString() && post?.data?.plan_manager) {
      throw new AppError(
        "You can\'t delete this plan.",
        400,
        1206,
        error = 'Plan permission denied. You can delete only your own plan.'
      );
    } 

    const deletedPost = await deleteById(post?.data?._id, Plan);

    if (post.error || deletedPost.error) {
      throw new AppError(
        "An error occurred while deleting a plan.",
        500,
        1204,
        post.error ?? deletedPost.error
      );
    }
    const removedPostFromProfile = await removePostFromProfile(
      req.query.authorId,
      req.params.id
    );

    if (removedPostFromProfile.error) {
      let newPost = { ...post.data };

      delete newPost._doc._id;

      await Plan.create(newPost._doc);
      throw new AppError(
        "Failed to remove post in profile. Plan delete rolled back.",
        500,
        1203,
        removedPostFromProfile.error
      );
    }

    res.status(200).json({
      id: req.params.id,
      message: "Plan deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//HELPERS

async function profileUpdate(authorId, createdPlan) {
  try {
    const updatedPlan = await Profile.findOneAndUpdate(
      { user: authorId },
      { $push: { posts: createdPlan } }
    );
    return Result.Success(updatedPlan);
  } catch (error) {
    return Result.Fail(error);
  }
}
async function removePostFromProfile(authorId, postId) {
  try {
    const data = await Profile.findOneAndUpdate(
      { user: authorId },
      { $pull: { posts: postId } },
      { new: true } // To return the updated document after removal
    );
    return Result.Success(data);
  } catch (error) {
    return Result.Fail(error);
  }
}

module.exports = {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
};
