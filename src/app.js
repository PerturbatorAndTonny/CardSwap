import express from "express";
import morgan from "morgan";
 
// Conexión a MongoDB usando connection.js del proyecto
import { mongoConnector } from "./utils/connection.js";
 
import routeOne from "./routes/routeOne.js";
import cardRoutes from "./routes/cardRoutes.js";
import userRoutes from "./routes/userRoutes.js";
 
const app = express();
 
app.use(express.json());
app.use(morgan("dev"));
 
// Iniciamos la conexión a MongoDB
mongoConnector();
 
app.use("/api/v1", routeOne);
app.use("/api/v1", cardRoutes);
app.use("/api/v1", userRoutes);
 
app.use((req, res, next) => {
  res.status(404).json({
    message: "Not found",
  });
});
 
export default app;