const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema(
  {
    id: Number,
    logoImage: String,
    title: {
      type: String,
      required: [true, "A plan must have a title"],
    },
    details: String,
    coverImage: String,
    link: String
  }
);




const Plan = mongoose.model("Plans", planSchema);

module.exports = Plan;