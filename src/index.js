import dotenv from "dotenv";
dotenv.config();
// dotenv.config({ path: "./.env" }); // ✅ Load FIRST

import connectDB from "./db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 9090, () => {
      console.log(`Server is running on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Mongo DB connection failed !!! : ${error}`);
  });
