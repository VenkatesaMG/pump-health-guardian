import express from "express";
import cors from "cors";
import { ref, set } from "firebase/database";
import { database } from "./firebase-config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.post("/sensor", async (req, res) => {
  const { current, flowrate } = req.body;
  const sensorData = {
    current: current,
    flowrate: flowrate,
    timestamp: Date().now(),
  };
  //   await set(ref(database, "pump1/latest"), sensorData);
  console.log("Sensor data", sensorData);
  res.status(200).json({ message: "Successfully received the data" });
});