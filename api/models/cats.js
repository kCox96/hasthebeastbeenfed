const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedingTimesSubSchema = new Schema(
  {
    time: {
      type: Date,
      required: false,
    },
    foodType: {
      type: String,
      required: false,
      min: 3,
      max: 255,
    },
  },
  { _id: false }
);

const userIdSubSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { _id: false }
);

const catSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  feedingTimes: [
    {
      type: feedingTimesSubSchema,
      required: false,
    },
  ],
  users: [
    {
      type: userIdSubSchema,
      required: true,
    },
  ],
  picture: {
    data: Buffer,
    contentType: String,
    required: false,
  },
});

module.exports = mongoose.model("Cat", catSchema, "cats");
module.exports = mongoose.model("FeedingTimes", feedingTimesSubSchema);
module.exports = mongoose.model("UserId", userIdSubSchema);
