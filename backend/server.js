require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const helmet = require("helmet");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const stationRoutes = require("./routes/station.routes");
const authRoutes = require('./routes/auth.routes');  
const Station = require("./models/Station");
const { pingHost } = require("./utils/ping");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.use("/api/stations", stationRoutes);
app.use("/api/auth", authRoutes);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("client connected", socket.id);
});

// background check (simple):
setInterval(async () => {
  const stations = await Station.find();
  for (const s of stations) {
    // Exemple: on pingue un host lié au code (à adapter)
    const ok = await pingHost("8.8.8.8"); // remplacer par IP réelle
    s.apStatus = ok ? "online" : "offline";
    s.lastCheck = new Date();
    s.logs.push({ ts: new Date(), message: `apStatus -> ${s.apStatus}` });
    await s.save();
  }
  io.emit("stations:update", await Station.find());
}, 5000);

const start = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on ${PORT}`));
};

start();
