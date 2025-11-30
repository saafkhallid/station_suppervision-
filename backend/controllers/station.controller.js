const Station = require("../models/Station");

exports.getStations = async (req, res) => {
  const stations = await Station.find().limit(100);
  res.json(stations);
};

exports.addStation = async (req, res) => {
  const s = new Station(req.body);
  await s.save();
  res.status(201).json(s);
};

exports.updateStation = async (req, res) => {
  const s = await Station.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(s);
};
exports.deleteStation = async (req, res) => {
  try {
    const stationId = req.params.id;

    const deletedStation = await Station.findByIdAndDelete(stationId);

    if (!deletedStation) {
      return res.status(404).json({ msg: "Station non trouvée" });
    }

    res.json({
      msg: "Station supprimée avec succès",
      station: deletedStation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
