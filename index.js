// oxlint-disable no-console
import app from "./src/app.js";
import { mongoConnector } from './src/utils/connection.js'

const port = process.env.PORT || 3000;

async function main() {
  try {
    await mongoConnector()
    app.listen(port)
    console.log(`Server running on port ${port}`)
  } catch (error) {
    console.log("Error starting server:", error)
  }
}

await main();