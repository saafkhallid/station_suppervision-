const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/station.controller");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

router.get("/", auth, ctrl.getStations);
router.post("/", auth, role("admin"), ctrl.addStation);
router.patch("/:id", auth, ctrl.updateStation);
router.delete("/:id", auth, ctrl.deleteStation);



module.exports = router;
