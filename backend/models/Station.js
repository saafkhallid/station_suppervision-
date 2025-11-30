const mongoose = require("mongoose");

const stationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: String, unique: true },
    location: { lat: Number, lng: Number },
    tpeStatus: {
      type: String,
      enum: ["online", "offline", "unknown"],
      default: "unknown",
    },
    apStatus: {
      type: String,
      enum: ["online", "offline", "unknown"],
      default: "unknown",
    },
    lastCheck: { type: Date, default: Date.now },
    logs: [{ ts: Date, message: String }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Station", stationSchema);
