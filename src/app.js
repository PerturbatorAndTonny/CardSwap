import express from "express";
import morgan from "morgan";

import routeOne from "./routes/routeOne.js";

<<<<<<< HEAD
// Importamos las rutas nuevas para la gestión de usuarios
import userRoutes from "./routes/userRoutes.js";
=======
import cardRoutes from "./routes/cardRoutes.js";
>>>>>>> 30a7f92a117801f9351ab7ce73c3e1847860c828

const app = express();

app.use(express.json())
app.use(morgan("dev"))

// Conexión a MongoDB usando la variable de entorno MONGO_URI del archivo .env
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error conectando a MongoDB:", err));

app.use("/api/v1", routeOne)
app.use("/api/v1", cardRoutes);

// Rutas nuevas para usuarios (HU1 - Editar perfil)
app.use("/api/v1", userRoutes);


app.use((req, res, next) => {
  res.status(404).json({
    message: "Not found"
  })
})

export default app;