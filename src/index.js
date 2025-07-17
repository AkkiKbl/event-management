import dotenv from "dotenv/config";
import express from "express";
import pool from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import errorHandling from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";
import eventRoutes from "./routes/eventRoutes.js";
import {
  createEventsTable,
  createRegistrationTable,
} from "./data/createEventsTable.js";

const app = express();

app.use(express.json());
app.use(cors());

//Routes
app.use("/api", userRoutes);
app.use("/api", eventRoutes);

//Error handling
app.use(errorHandling);

//Create table if not exists

async function initializeDatabase() {
  try {
    await createUserTable();
    await createEventsTable();
    await createRegistrationTable();
    console.log("All tables initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize database tables:", err);
  }
}

initializeDatabase();

//Testing Postgres Connection
app.get("/", async (req, res) => {
  try {
    const Query = "SELECT * from users";
    const result = await pool.query(Query);
    res.status(200).json(result.rows);
    console.log(result.rows);
  } catch (err) {
    console.log("Error fetching Data: ", err);
    res.status(500).json({ Error: "Failed to fetch" });
  }
});

//server running
app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}`);
});
