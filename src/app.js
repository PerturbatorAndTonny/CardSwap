import express from "express";
import morgan from "morgan";

import routeOne from "./routes/routeOne.js";

// Importamos las rutas nuevas para la gestión de usuarios
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json())
app.use(morgan("dev"))

// Conexión a MongoDB usando la variable de entorno MONGO_URI del archivo .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

app.use("/api/v1", routeOne)

// Rutas nuevas para usuarios (HU1 - Editar perfil)
app.use("/api/v1", userRoutes);


app.use((req, res, next) => {
  res.status(404).json({
    message: "Not found"
  })
})

export default app;