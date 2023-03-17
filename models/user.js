const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  message: {
    type: String,
  },
  number: {
    type: String,
  },
  contact: [
    {
      type: Schema.Types.ObjectId,
      ref: "ContactUs",
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
