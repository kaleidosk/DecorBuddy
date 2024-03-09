const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  architectId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  picture: String,
  description: String,
  projectStatus: { type: String, enum: ["pending", "ongoing", "completed"], default: "pending" },
  quotations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quotation' }]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;