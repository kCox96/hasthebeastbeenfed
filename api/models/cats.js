const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const catSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  feedingTimes: [
    {
      type: [feedingTimesSubSchema],
      required: false,
    },
  ],
  users: [
    {
      type: [userIdSubSchema],
      required: true,
    },
  ],
  picture: {
    data: Buffer,
    contentType: String,
    required: false,
  },
});

const feedingTimesSubSchema = new Schema({
  time: {
    type: Date,
    required: false,
  },
  type: {
    type: String,
    required: false,
    min: 3,
    max: 255,
  },
});

const userIdSubSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

module.exports = mongoose.model("Cat", catSchema);
module.exports = mongoose.model("FeedingTimes", feedingTimesSubSchema);
module.exports = mongoose.model("UserId", userIdSubSchema);
