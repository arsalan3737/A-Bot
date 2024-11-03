const { mongoose } = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: { type: String, require: true, unique: true },
  balance: { type: Number, default: 1000 },
});

const model = mongoose.model("arse-bot", profileSchema);

module.exports = model;
