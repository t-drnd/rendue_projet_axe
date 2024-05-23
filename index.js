import express from "express";
import router from "./start.js";
import cors from "cors";
import bodyParser from "body-parser";
import ip from "ip";

const app = express();
const port = 3000;

let lastHouseVisited = "";

try {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/", router);

  app.get("/", (req, res) => {
    res.json({ message: lastHouseVisited });
  });
  app.post("/", (req, res) => {
    lastHouseVisited = req.body.house;
    res.json({ message: lastHouseVisited });
  });

  app.listen(port, () => {
    console.log("Server running at http://" + ip.address() + ":" + port);
  });
} catch (error) {
  console.error("Error starting server:", error);
}
