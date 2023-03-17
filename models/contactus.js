const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const contactUseSchema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  number: {
    type: String,
  },
});
module.exports = mongoose.model("ContactUs", contactUseSchema);
