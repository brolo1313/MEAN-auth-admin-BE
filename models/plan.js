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
    link: String,

    plan_manager : {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'User',
      required  : true,
      immutable : true 
    },
  },
  
);

// planSchema.pre("deleteOne", async function (next) {
  
//   console.log('delete middleware');

//   next();
// });



const Plan = mongoose.model("Plans", planSchema);

module.exports = Plan;